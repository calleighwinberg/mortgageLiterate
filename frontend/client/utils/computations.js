export const computePrices = (tca) => {
    console.log('tca in computations', tca)
    // Create an array to store the computed values for each scenario
    const computedScenarios = tca.scenarios.map((scenario) => {
      return {
        loan: calculateLoan(scenario),
        //payment: calculatePayment(scenario),
        piPayment: calculatePIPayment(scenario),
        piti: calculatePITIPayment(scenario),
        cashToClose: calculateCashToClose(scenario),
      };
    });

    console.log("Computed Prices:", computedScenarios);
  
    return computedScenarios;
  };
    

  
  // // Example computation functions (you'll need to replace these with your actual logic)
  // const calculatePrice = (scenario) => {
  //   return scenario.price; // Placeholder
  // };
  
  const calculateLoan = (scenario) => {
    const loan = scenario.price - scenario.downPayment ;
    return loan;
  };
  
  
  const calculatePIPayment = (scenario) => {
    if (scenario.term == 0) {
        return 0;  
    }
    if (scenario.rate == 0) {
        return (scenario.price - scenario.downPayment) / scenario.term;  
    }
    var i = (scenario.rate * .01) / 12;
    var monthlyInt = Math.pow((i + 1), scenario.term);
    var totalPayment = (scenario.price - scenario.downPayment) * ((i * monthlyInt) / (monthlyInt - 1));
    var result = Math.round(totalPayment * 100) / 100;
    return result;
  };

  const calculatePITIPayment = (scenario) => {
    var pi = calculatePIPayment(scenario)
    return pi + scenario.mc.taxes + scenario.mc.hazIns + scenario.mc.pmi + scenario.mc.hoa
  };
  
  const calculateCashToClose = (scenario) => {
    return scenario.downPayment; // Placeholder
  };
  