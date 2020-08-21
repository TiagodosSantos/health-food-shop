import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import LinkWrapper from '../../Utils/LinkWrapper';

const HeaderContent = styled.header`
    margin: 0px;
    padding: 16px;
    background: steelblue;
    color: white !important;
`;


const Header = () => {

    const [user, setUser] = React.useState('');

    React.useEffect(() => {
      setUser(localStorage.getItem('auth-user') || '');
    }, [user]);

    const User = () => {
      return user ? `${user}` : <LinkWrapper to="/login">Logar</LinkWrapper>;
    } 

    return (
        <HeaderContent>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              Smartest IT Solutions ME 
            </Grid>
            <Grid item xs={2}>
              <User />
            </Grid>
          </Grid>
        </HeaderContent>
    );
}

export default Header;