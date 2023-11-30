import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export default function ContactUsField() {
  const emailRef: any = useRef();

  const successfulSend = () => {
    toast.success("Email send successfully!");
  };

  const failedSend = () => {
    toast.error("Email not send (Error)!");
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2bn1w7s",
        "template_4ae05u2",
        emailRef.current,
        "kYybubkSD7vj2KAH7"
      )
      .then(
        (result) => {
          successfulSend();
        },
        (error) => {
          failedSend();
        }
      );
    e.target.reset();
  };

  return (
    <>
      <form ref={emailRef} onSubmit={sendEmail}>
        <FormControl defaultValue="" required>
          <Label>Name:</Label>
          <StyledInput
            placeholder="Write the name you would like to be called!"
            type="text"
            name="user_name"
          />
          <HelperText />
        </FormControl>
        <FormControl defaultValue="" required>
          <Label>Your e-mail:</Label>
          <StyledInput
            type="email"
            placeholder="Write your email for us to contact you!"
            name="user_email"
          />
          <HelperText />
        </FormControl>
        <FormControl defaultValue="" required>
          <Label>Message:</Label>
          <StyledTextField
            sx={{ marginLeft: -2 }}
            rows={5}
            multiline
            required
            name="message"
          />
          <HelperText />
        </FormControl>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#aa6c39",
            color: "#aa6c39",

            "&:hover": {
              backgroundColor: "beige",
              color: "orange",
              borderColor: "orange",
            },
          }}
          type="submit"
        >
          Send
        </Button>
      </form>
    </>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 91%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);

const StyledTextField = styled(TextField)(
  ({ theme }) => `
  width: 100%; 

    .MuiInputBase-input {
      width: 100%; 
      
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
      box-shadow: 0px 2px 2px ${
        theme.palette.mode === "dark" ? grey[900] : grey[50]
      };

      &:hover {
        border-color: ${blue[400]};
      }

      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${
          theme.palette.mode === "dark" ? blue[600] : blue[200]
        };
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border: none; // Remove default outline/border for multiline input
    }

    .MuiOutlinedInput-multiline {
      width: 100%; 
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
      box-shadow: 0px 2px 2px ${
        theme.palette.mode === "dark" ? grey[900] : grey[50]
      };
    }

    .MuiOutlinedInput-multiline:hover {
      border-color: ${blue[400]};
    }

    .Mui-focused .MuiOutlinedInput-multiline {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  `
);

const Label = styled(
  ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <p
        className={clsx(className, error || showRequiredError ? "invalid" : "")}
      >
        {children}
        {required ? " *" : ""}
      </p>
    );
  }
)`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
