<form className={classes.container} noValidate autoComplete="off">

        <div>
          <MuiThemeProvider>
            <div>
              

              <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={(event, newValue) => this.setState({ email: newValue })}

              />
              <br />
              <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={(event, newValue) => this.setState({ password: newValue })}

        />
            
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />

            </div>
          </MuiThemeProvider>
        </div>
      </form>