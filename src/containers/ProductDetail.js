import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { selectedProduct, removeSelectedProduct } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const ProductDetails = () => {
    const product = useSelector((state) => state.product)
    const {description, title, price, category, image} = product;
    const {productId}= useParams();//to get parameters from source
    const dispatch = useDispatch();
    console.log(product);

    const fetchProductDetail = async() => {
        const response = await axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .catch((err) => {
            console.log("err", err)
        });
        dispatch(selectedProduct(response.data));
    }

    useEffect(() => {
        if(productId && productId !=="") fetchProductDetail();
        return () => {
            console.log("ProductDetail on unMount");
            dispatch(removeSelectedProduct());
        }
    }, [productId]);

    return(
        <div className="ui grid container">
            {Object.keys(product).length === 0? (<div>...Loading</div>) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider">AND</div>
                        <div className="middle aligned row">
                            <div className="column lp">
                            <img className="ui fluid image" src={image} alt={title}/>
                            </div>
                            <div className="column rp">
                                <h1>{title}</h1>
                                <h2>
                                    <a className="ui teal tag label">${price}</a>
                                </h2>
                                <h3 className="ui brown block header">{category}</h3>
                                <p>{description}</p>
                            </div>
                        </div>   
                    </div>    
                </div>
            )};
        </div>       
);
            }
export default ProductDetails;