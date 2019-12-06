
import React, {useState} from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory } from 'react-router-dom';
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
//import Login from "components/auth/Login";
import Swal from 'sweetalert2';

const useStyles = makeStyles(styles);

const LoginPage = (props)  =>{

    const classes = useStyles();
    const { push } = useHistory();
  
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);

  const signup = async () => {
    if (!passwordsMatch()) {
      return Swal.fire({
        icon: 'warning',
        title: "Validation Error",
        text: "Passwords Don't Match",
      });
    }

    try { 
    const url = "http://localhost:8080/user/register";
    await fetch(url, 
      {
        method: "POST",
        body: JSON.stringify({ name: name, email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
    Swal.fire(
      'Success!',
      'Thank you for making an account with us!',
      'success'
    )
    push("/login");    
    }catch(e) {
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: e,
      })
    }
  }

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const passwordsMatch = () => password === confirmPassword

  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Photos By Kevin"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                    <div className={classes.socialLine}>
                     
                    </div>
                  </CardHeader>
                  <a href="/login"style={{display: 'flex', justifyContent: 'center'}}>Already have an account? Login here</a>
                  <CardBody>
                    <CustomInput
                      labelText="Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"                        
                      }}
                    />
                    <CustomInput
                      labelText="Retype Password"
                      id="pass2"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: confirmPassword,
                        onChange: (e) => setConfirmPassword(e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"                        
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={signup}>
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default LoginPage;