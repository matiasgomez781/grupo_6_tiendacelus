const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "/products.json");
// const reWriteJson = function () {
//   fs.writeFileSync(
//     productsFilePath,
//     JSON.stringify(this.products),
//     "utf-8"
//   )
// } 

const productService = {
  products: JSON.parse(fs.readFileSync(productsFilePath, "utf-8")),

  // reWriteJson: ()=>{
  //   fs.writeFileSync(productsFilePath,JSON.stringify(this.products),"utf-8")
  // }  

  getAll: function () {
    return this.products;
  },

  getById: function (id) {
    return this.products.find((product) => product.id == id);
  },

  getBy: function (category) {
    return this.products.filter((product) => product.category == category);
  },

  save: function (product) {
    product.id = this.products[this.products.length - 1].id + 1;
    this.products.push(product);
    fs.writeFileSync(productsFilePath,JSON.stringify(this.products),"utf-8")
    // reWriteJson();
    // return product
  },

  update: function (product, idProduct) {
    let productToEdit = this.getBy(idProduct);

    productToEdit.name = product.name;
    productToEdit.price = product.price;
    productToEdit.description = product.description;
    productToEdit.category = product.category;
    productToEdit.discount = product.discount;

    reWriteJson;
  },

  delete: function (id) {
    this.products = this.products.filter((product) => product.id != id);

    reWriteJson;
  },
};

module.exports = productService;
