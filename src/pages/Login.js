import React, { useContext, useState } from 'react'
import Base from '../components/Base'
import {
  CardHeader,
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import { toast } from 'react-toastify';
import { loginUser } from '../services/user-service';
import { doLogin } from '../auth';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/userContext';

function Login() {

  const userContexData=useContext(userContext)
  const navigate=useNavigate()



 const[loginDetail,setloginDetail] =useState({
    email:"",
    password:""

  })

  const handleChange=(e,field)=>{
    setloginDetail({ ...loginDetail, [field]: e.target.value });

  }


  const handleFormsubmit=(event)=>{
    event.preventDefault();
    console.log(loginDetail);
    if (loginDetail.email.trim()===""|| loginDetail.password.trim()===""){
      toast.error("email or password is required")
      return;
    }
    loginUser(loginDetail).then((data)=>{
      console.log("user login")
      // save the data to local storage
      doLogin(data,()=>{
        console.log("login details saved to local storage")
        userContexData.setUser({
          data:data,
          login:true,


        })
        //redirect to user dashboard page
        navigate("/user/dashboard")


      })

      console.log(data)
      toast.success("login successful")

    }).catch(error=>{
      console.log(error)
      if(error.response.request.status===400||error.response.status===404){
        toast.error(error.response.data.message)
      }else{
        toast.error("something went wrong on server!!")
      }
     
    })



  }

  const handleReset=()=>{
    setloginDetail({ email:"",
    password:""})
  };

  return (
   
   <Base>
   <Container>
        <Row className="mt-4">
          <Col sm={{size:6,offset:3}}>
          <Card color="dark" inverse>
          <CardHeader>
            <h3>login here!!</h3>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleFormsubmit}>
              
              <FormGroup>
                <Label for="email">Enter email</Label>
                <Input id="email" placeholder="Enter here" type="text" value={loginDetail.email} onChange={(e)=>handleChange(e,"email")} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Enter password</Label>
                <Input id="password" placeholder="Enter here" type="password" value={loginDetail.password} onChange={(e)=>handleChange(e,"password") }/>
              </FormGroup>
              
              <Container className="text-center">
                <Button outline color="light" type='submit'>Register</Button>
                <Button color="secondary" type="reset" className="ms-2" onClick={handleReset}>Reset</Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
          </Col>
        </Row>
        
      </Container>

    
    </Base>
  )
}

export default Login
