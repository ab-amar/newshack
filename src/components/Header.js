import {
    AppBar,
    StyledEngineProvider,
    Container,
    Toolbar,
    Typography,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { NewsState } from "../NewsContext";
 
  
  
  const Header = () => {
    const {search, setSearch } = NewsState();
    return (
      <div backgroundcolor="red">
        
        <StyledEngineProvider injectFirst>
          <AppBar
            color="transparent"
            position="static"
            sx={{ bgcolor: "#FF742B" }}
          >
            <Container>
              <Toolbar>
                <Typography variant="h6" className="title">
                  Hacker News
                </Typography>
                <TextField
                  label="Search For News"
                  variant="outlined"
                  style={{
                    // marginBottom: 20,
                    width: "100%",
                    backgroundColor: "white",
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value.toLocaleLowerCase());
                  }}
                />
              </Toolbar>
            </Container>
          </AppBar>
        </StyledEngineProvider>
      </div>
    );
  };
  
  export default Header;
  