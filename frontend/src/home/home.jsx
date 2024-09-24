import React, { useState } from 'react';
import "../style/home.css";

function Home() {
    const [formData, setFormData] = useState({
        nombre: '',
        brand: '',
        description: '',
        product_image: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            product_image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('brand', formData.brand);
        data.append('description', formData.description);
        if (formData.product_image) {
            data.append('product_image', formData.product_image);
        }

        let config = {
            method: 'POST', 
            headers: {
                'x-version': '1.0.0'
            },
            body: data
        };

        try {
            let response = await fetch('http://localhost:3000/home', config);
            let resText = await response.text();
            console.log(resText);
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <div>
            <span className="message">Hexagonal by express</span>
            <div className="container">
                <div className="admin-product-form-container">
                    <form id="myForm" onSubmit={handleSubmit} encType="multipart/form-data">
                        <h3>Add a new Product</h3>
                        <input 
                            type="text" 
                            placeholder="Enter the product name" 
                            name="nombre" 
                            className="box" 
                            value={formData.nombre} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            type="text" 
                            placeholder="Enter the brand of the product" 
                            name="brand" 
                            className="box" 
                            value={formData.brand} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            type="text" 
                            placeholder="Enter the product description" 
                            name="description" 
                            className="box" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/jpg" 
                            name="product_image" 
                            className="box" 
                            onChange={handleFileChange} 
                        />
                        <input type="submit" className="btn" name="add" value="Add" />
                    </form>
                </div>
                <div className="product-display">
                    <table className="product-display-table">
                        <thead>
                            <tr>
                                <td>Codigo</td>
                                <td>Name</td>
                                <td>Last Name</td>
                                <td>Nick</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Rol</td>
                                <td>Accion</td>
                            </tr>
                        </thead>
                        <tbody id="myTbody">
                            {/* Example row (uncomment to use) */}
                            { <tr>
                                <td><img src="//" height="100" alt="" /></td>
                                <td contentEditable></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <a href="#" className="btn">Edit</a>
                                    <a href="#" className="btn">Delete</a>
                                </td>
                            </tr> }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
