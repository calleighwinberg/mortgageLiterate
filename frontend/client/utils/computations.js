export const computePrices = (tca) => {
    console.log('tca in computations', tca)
    // Create an array to store the computed values for each scenario
    const computedScenarios = tca.scenarios.map((scenario) => {
      return {
        price: calculatePrice(scenario),
        loan: calculateLoan(scenario),
        rate: calculateInterestRate(scenario),
        term: calculateTerm(scenario),
        //payment: calculatePayment(scenario),
        cashToClose: calculateCashToClose(scenario),
      };
    });

    console.log("Computed Prices:", computedScenarios);
  
    return computedScenarios;
  };
    

  
  // Example computation functions (you'll need to replace these with your actual logic)
  const calculatePrice = (scenario) => {
    return scenario.price; // Placeholder
  };
  
  const calculateLoan = (scenario) => {
    const loan = scenario.price - scenario.downPayment ;
    return loan;
  };
  
  const calculateInterestRate = (scenario) => {
    return scenario.rate; //
  };
  
  const calculateTerm = (scenario) => {
    return scenario.term; // 
  };
  
  const calculatePIPayment = (scenario) => {
    return scenario.payment; // Placeholder
  };

  const calculatePITIPayment = (scenario) => {
    return scenario.payment; // Placeholder
  };
  
  const calculateCashToClose = (scenario) => {
    return scenario.downPayment; // Placeholder
  };
  