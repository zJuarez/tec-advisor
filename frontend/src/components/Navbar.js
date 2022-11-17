import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import pages from '../data/categories';
import Login from '@mui/icons-material/Login';
import logo from '../logo/logo-wc.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const settings = ['Logout'];

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const location = useLocation()
  const logIn = document.cookie.search('userName=') !== -1
  const userName = logIn ? document.cookie.substr(
    document.cookie.search('userName=') + 9
  ) : null
  const logoButton = <Link to='/' style={{ textDecoration: 'none' }}>  <img src={logo} style={{ padding: 10 }} width="70px"></img> </Link>

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get('/api/logout', {

      });
      if (data.success) {
        document.cookie = "token= ; path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT"; // eliminate token
        document.cookie = "userName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/";

        console.log("logout event")
        handleCloseUserMenu()
      }
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (location.pathname.includes("signup") || location.pathname.includes("login")) {
    document.body.style = 'background: #5065A8;';
    return (<></>);
  }
  document.body.style = 'background: #f5f3ee;';
  return (
    <AppBar style={{ color: "#f5f3ee" }} position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> {logoButton}</Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (

                <MenuItem key={page} >
                  <Link to={"/" + page} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>

              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> {logoButton}</Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={"/" + page} style={{ textDecoration: 'none' }}>
                <Button
                  key={page}
                  style={{ color: "#f5f3ee" }}
                  sx={{ my: 2, display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {logIn && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src="" > {userName[0]}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'Logout'} onClick={handleLogout}>
                <Typography textAlign="center">{'Logout'}</Typography>
              </MenuItem>
              <MenuItem key={'Add place'}>
                <Link to='/addBus' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">{'Add place'}</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>}
          {!logIn &&
            <Link to='/login'>
              <IconButton aria-label="login">
                <Login style={{ color: "#f5f3ee" }} />
              </IconButton>
            </Link>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
