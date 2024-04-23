import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Navbarwithoutsearch from './Navbarwithoutsearch';
import Navbarwithsearch from './Navbarwithsearch';
import SearchHome from './SearchHome';
import Aboutus from './Aboutus';
import ProductDetail from './ProductDetail';
import Sidebar from './Sidebar';
import Login from './Login';
import ProductManage from './productManage';
import AddProduct from './AddProduct';
import Searchuser from './Searchuser';
import Usermanage from './Usermanage';
import ModifyProduct from './ModifyProduct';
import ProductList from './ProductList';
import Adduser from './Adduser';
import Modifyuser from './Modifyadmin';
import ProductSearchAdmin from './ProductSearchAdmin';

class App extends React.Component {
  render() {
    console.log(this.state)
    
    return (
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/">
              <Navbarwithsearch/>
              <ProductList/>
              </Route>
              <Route path="/usermanage">
              <Sidebar/>
                <Usermanage/>
              </Route>
              <Route path="/productdetail">
                <Navbarwithsearch/>
                <ProductDetail />
              </Route>
              <Route path="/modifyuser">
                <Sidebar/>
                <Modifyuser/>
              </Route>
              <Route path="/adduser">
                <Sidebar/>
                <Adduser/>
              </Route>
              <Route path="/searchuser">
                <Sidebar/>
                <Searchuser/>
              </Route>
              <Route path="/Searchhome">
                <Navbarwithoutsearch/>
                <SearchHome />
              </Route>


              <Route path="/aboutus">
                <Navbarwithsearch/>
                <Aboutus/>
              </Route>
              
              <Route path="/ProductManage" render={(props) => <><Sidebar {...props} authed={true} /><ProductManage {...props} authed={true} /></>}/>
              <Route path="/login">
                <Navbarwithoutsearch/>
                <Login/>
              </Route>

              <Route path='/AddProduct'>
                <Sidebar/>
                <AddProduct/>
              </Route>

              <Route path='/ModifyProduct'>
                <Sidebar/>
                <ModifyProduct/>
              </Route>
              

              <Route path="/ProductSearchAdmin">
                <Sidebar/>
                <ProductSearchAdmin/>
              </Route>


            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
