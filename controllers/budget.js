// This hold all product related logic

const Budget = require('../models/budget');

exports.getAddBudget = (req,res) => {
  Budget.find()
  .then(budgets => {
    console.log(budgets);
    res.render('add-budget', {docTitle: 'Add-Budget',editing:false , budgets:budgets}); 
   
  })
  .catch(err => console.log(err));  
  

   }



exports.postAddBudget = (req, res, next) => {
    const month = req.body.month;
    const foodBud = req.body.foodBud;
    const drinksBud = req.body.drinksBud;
    const smokeBud = req.body.smokeBud;
    const entertainmentBud = req.body.entertainmentBud;
    const travelBud = req.body.travelBud;
    const shoppingBud = req.body.shoppingBud;
    const budget = new Budget({
        month: month,
        foodBud: foodBud,
        drinksBud: drinksBud,
        smokeBud: smokeBud,
        entertainmentBud: entertainmentBud,
        travelBud: travelBud,
        shoppingBud: shoppingBud
    });
    console.log(budget);
    budget
      .save()
      .then(result => {
        // console.log(result);
        console.log('Budget Created!');
        res.redirect('/shop/budget');
      })
      .catch(err => {
        console.log(err);
      });
  };



 

//-------------



exports.postDeleteBudget= (req, res, next) => {
    const budId = req.body.budgetId;
    console.log(budId);
    Budget.findByIdAndRemove(budId)
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/shop/budget');
      })
      .catch(err => console.log(err));
  };
  

  exports.getEditBudget = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/shop');
    }
    const budId = req.params.budgetId;
    Budget.findById(budId)
      .then(budget => {
        if (!budget) {
            console.log('No budget Found')
          return res.redirect('/shop');
        } 
        res.render('add-budget', {
          docTitle: 'Edit Budget',
          editing: editMode,
          budget: budget,
          budgets: null
        });
      })
      .catch(err => console.log(err));
  };


  exports.postEditBudget = (req, res, next) => {
    const budId = req.body.budgetId;
    const month = req.body.month;
    const foodBud = req.body.foodBud;
    const drinksBud = req.body.drinksBud;
    const smokeBud = req.body.smokeBud;
    const entertainmentBud = req.body.entertainmentBud;
    const travelBud = req.body.travelBud;
    const shoppingBud = req.body.shoppingBud;

  console.log('Inside Edit Post');
    Budget.findById(budId)
      .then(budget => {
        budget.month = month;
        budget.foodBud = foodBud;
        budget.drinksBud = drinksBud;
        budget.smokeBud = smokeBud;
        budget.entertainmentBud = entertainmentBud;
        budget.travelBud = travelBud;
        budget.shoppingBud = shoppingBud;

        return budget.save();
      })
      .then(result => {
        console.log('UPDATED Budget!');
        res.redirect('/shop/budget');
      })
      .catch(err => console.log(err));
  };

  