export const ButtonSizes = `
  <div>
    <div>
      <Button size="small" className={classes.margin}>
        Small
      </Button>
      <Button size="medium" className={classes.margin}>
        Medium
      </Button>
      <Button size="large" className={classes.margin}>
        Large
      </Button>
    </div>
    <div>
      <Button variant="outlined" size="small" color="primary" className={classes.margin}>
        Small
      </Button>
      <Button variant="outlined" size="medium" color="primary" className={classes.margin}>
        Medium
      </Button>
      <Button variant="outlined" size="large" color="primary" className={classes.margin}>
        Large
      </Button>
    </div>
    <div>
      <Button variant="contained" size="small" color="primary" className={classes.margin}>
        Small
      </Button>
      <Button variant="contained" size="medium" color="primary" className={classes.margin}>
        Medium
      </Button>
      <Button variant="contained" size="large" color="primary" className={classes.margin}>
        Large
      </Button>
    </div>
    <div>
      <Fab size="small" color="secondary" aria-label="Add" className={classes.margin}>
        <AddIcon />
      </Fab>
      <Fab size="medium" color="secondary" aria-label="Add" className={classes.margin}>
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="Add" className={classes.margin}>
        <AddIcon />
      </Fab>
    </div>
    <div>
      <Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="Add"
        className={classes.margin}
      >
        <NavigationIcon className={classes.extendedIcon} />
        Extended
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="Add"
        className={classes.margin}
      >
        <NavigationIcon className={classes.extendedIcon} />
        Extended
      </Fab>
      <Fab variant="extended" color="primary" aria-label="Add" className={classes.margin}>
        <NavigationIcon className={classes.extendedIcon} />
        Extended
      </Fab>
    </div>
    <div>
      <IconButton aria-label="Delete" className={classes.margin} size="small">
        <ArrowDownwardIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="Delete" className={classes.margin}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Delete" className={classes.margin}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="Delete" className={classes.margin}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  </div>
`

export const ContainedButtons = `
  <div>
    <Button variant="contained" className={classes.button}>
      Default
    </Button>
    <Button variant="contained" color="primary" className={classes.button}>
      Primary
    </Button>
    <Button variant="contained" color="secondary" className={classes.button}>
      Secondary
    </Button>
    <Button variant="contained" color="secondary" disabled className={classes.button}>
      Disabled
    </Button>
    <Button variant="contained" href="#contained-buttons" className={classes.button}>
      Link
    </Button>
    <input
      accept="image/*"
      className={classes.input}
      id="contained-button-file"
      multiple
      type="file"
    />
    <label htmlFor="contained-button-file">
      <Button variant="contained" component="span" className={classes.button}>
        Upload
      </Button>
    </label>
  </div>
`

export const FloatingActionButtons = `
  <div>
    <Fab color="primary" aria-label="Add" className={classes.fab}>
      <AddIcon />
    </Fab>
    <Fab color="secondary" aria-label="Edit" className={classes.fab}>
      <Icon>edit_icon</Icon>
    </Fab>
    <Fab variant="extended" aria-label="Delete" className={classes.fab}>
      <NavigationIcon className={classes.extendedIcon} />
      Extended
    </Fab>
    <Fab disabled aria-label="Delete" className={classes.fab}>
      <DeleteIcon />
    </Fab>
  </div>
`

export const GroupedButtons = `
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <ButtonGroup size="small" aria-label="Small outlined button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup color="primary" aria-label="Outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup
            color="secondary"
            size="large"
            aria-label="Large outlined secondary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <ButtonGroup variant="contained" size="small" aria-label="Small contained button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="Full-width contained primary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup
            variant="contained"
            color="secondary"
            size="large"
            aria-label="Large contained secondary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <ButtonGroup fullWidth aria-label="Full width outlined button group">
        <Button>Full</Button>
        <Button>width</Button>
        <Button>ButtonGroup</Button>
      </ButtonGroup>
    </Grid>
  </Grid>
`

export const IconButtons = `
  <div>
    <IconButton className={classes.button} aria-label="Delete">
      <DeleteIcon />
    </IconButton>
    <IconButton className={classes.button} aria-label="Delete" disabled color="primary">
      <DeleteIcon />
    </IconButton>
    <IconButton color="secondary" className={classes.button} aria-label="Add an alarm">
      <Icon>alarm</Icon>
    </IconButton>
    <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
      <AddShoppingCartIcon />
    </IconButton>
    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
    <label htmlFor="icon-button-file">
      <IconButton
        color="primary"
        className={classes.button}
        aria-label="Upload picture"
        component="span"
      >
        <PhotoCamera />
      </IconButton>
    </label>
  </div>
`

export const OutlinedButtons = `
  <div>
    <Button variant="outlined" className={classes.button}>
      Default
    </Button>
    <Button variant="outlined" color="primary" className={classes.button}>
      Primary
    </Button>
    <Button variant="outlined" color="secondary" className={classes.button}>
      Secondary
    </Button>
    <Button variant="outlined" disabled className={classes.button}>
      Disabled
    </Button>
    <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
      Link
    </Button>
    <input
      accept="image/*"
      className={classes.input}
      id="outlined-button-file"
      multiple
      type="file"
    />
    <label htmlFor="outlined-button-file">
      <Button variant="outlined" component="span" className={classes.button}>
        Upload
      </Button>
    </label>
    <Button variant="outlined" color="inherit" className={classes.button}>
      Inherit
    </Button>
  </div>
`

export const SplitButtons = `
  <Grid container>
    <Grid item xs={12} align="center">
      <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="Split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  </Grid>
`

export const TextButton = `
  <div>
    <Button className={classes.button}>Default</Button>
    <Button color="primary" className={classes.button}>
      Primary
    </Button>
    <Button color="secondary" className={classes.button}>
      Secondary
    </Button>
    <Button disabled className={classes.button}>
      Disabled
    </Button>
    <Button href="#text-buttons" className={classes.button}>
      Link
    </Button>
    <input
      accept="image/*"
      className={classes.input}
      id="text-button-file"
      multiple
      type="file"
    />
    <label htmlFor="text-button-file">
      <Button component="span" className={classes.button}>
        Upload
      </Button>
    </label>
  </div>
`