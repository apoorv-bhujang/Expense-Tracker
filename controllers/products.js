// This hold all product related logic

const Product = require('../models/product');

exports.getAddProduct = (req,res) => {
  const options = ['Food', 'Drinks', 'Smoke', 'Entertainment', 'Travel', 'Shopping'];
    res.render('add-expense', {docTitle: 'Add-Product', editing: false, options: options}); 
   }



exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const amount = req.body.amount;
    const category = req.body.selectedOption;
    const description = req.body.description;
    const expense = new Product({
      title: title,
      amount: amount,
      category: category,
      description: description
    });
    console.log(expense);
    expense
      .save()
      .then(result => {
        // console.log(result);
        console.log('Expense Created!');
        res.redirect('/shop');
      })
      .catch(err => {
        console.log(err);
      });
  };

exports.getProducts = (req, res, next) => {
    Product.find()
      .then(products => {
        console.log(products);
        res.render('shop', {
          prods: products,
          docTitle: 'Expense Tracker'
        });
      })
      .catch(err => console.log(err));
  };

 
  exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findByIdAndRemove(prodId)
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/shop');
      })
      .catch(err => console.log(err));
  };
  

  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/shop');
    }
    const prodId = req.params.productId;
    const options = ['Food', 'Drinks', 'Smoke', 'Entertainment', 'Travel', 'Shopping'];
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return res.redirect('/shop');
        } 
        res.render('add-expense', {
          docTitle: 'Edit Product',
          editing: editMode,
          expense: product,
          options: options
        });
      })
      .catch(err => console.log(err));
  };


  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedAmount= req.body.amount;
    const updatedCategory= req.body.selectedOption;
    const updatedDescription= req.body.description;
  console.log('Inside Edit Post');
    Product.findById(prodId)
      .then(product => {
        product.title = updatedTitle;
        product.amount = updatedAmount;
        product.category = updatedCategory;
        product.description = updatedDescription;
        return product.save();
      })
      .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/shop');
      })
      .catch(err => console.log(err));
  };

  

  exports.getSearch = (req,res) => {
    const options = ['', 'Food', 'Drinks', 'Smoke', 'Entertainment', 'Travel', 'Shopping'];
      res.render('search-expense', {docTitle: 'Search-Expense', editing: false, options: options, searchResult: null }); 
     }
  

     exports.postSearch = (req, res, next) => {
      const selectedOption = req.body.selectedOption;
      const title = req.body.title;
      const options = ['', 'Food', 'Drinks', 'Smoke', 'Entertainment', 'Travel', 'Shopping'];
      
      let queryParam = '';
      if(title && selectedOption){
         queryParam = {category: selectedOption, title:title};
      }else if(title){
         queryParam = {title:title};
      }else if(selectedOption){
         queryParam = {category:selectedOption};
      }
      console.log(queryParam);
      Product.find(queryParam)
        .then(result => {
          console.log(result);
          res.render('search-expense', {docTitle: 'Search-Expense', options: options, searchResult: result}); 
        })
        .catch(err => console.log(err));
      
    };
    

    