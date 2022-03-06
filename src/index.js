import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from './App';
import Login from './components/login/Login';
import BlogList from './components/blog/BlogList';
import BlogDetail from './components/blog/BlogDetail';
import Products from './components/account/MyProducts/Products';
import Add from './components/account/MyProducts/Add';
import Edit from './components/account/MyProducts/Edit';
import UpdateUser from './components/account/MyAccount/Edit';
import HomeProducts from './components/home/HomeProducts';
import ProductDetail from './components/home/ProductDetail';
import Cart from './components/cart/Cart';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* <Routes>
                <Route path='/' element={<App />} >
                    <Route path='login' element={<Login />} />
                    <Route path='bloglist' element={<BlogList />} />
                    <Route path='bloglist/:id' element={<BlogDetail />} />
                </Route>
            </Routes> */}
            <App>
                <Route path='/' exact component={HomeProducts} />
                <Route path='/login' component={Login} />
                <Route path='/bloglist' exact component={BlogList} />
                <Route path='/bloglist/:id' component={BlogDetail}/>
                <Route path='/bloglist/:id' component={BlogDetail}/>
                <Route path='/account/my-products' exact component={Products}/>
                <Route path='/account/my-products/add' component={Add}/>
                <Route path='/account/my-products/edit/:id' component={Edit}/>
                <Route path='/account/my-account' component={UpdateUser}/>
                <Route path='/product-detail/:id' component={ProductDetail}/>
                <Route path='/cart' component={Cart}/>
            </App>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
