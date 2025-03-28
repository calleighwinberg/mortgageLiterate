export const computePrices = (tca) => {
    console.log('tca in computations', tca)
    // Create an array to store the computed values for each scenario
    const computedScenarios = tca.scenarios.map((scenario) => {
      return {
        loan: calculateLoan(scenario),
        piPayment: calculatePIPayment(scenario),
        piti: calculatePITIPayment(scenario),
        ctc: calculateCashToClose(scenario),
        points: calculatePoints(scenario),
        ltv: calculateLTV(scenario),
      };
    });

    console.log("Computed Prices:", computedScenarios);
  
    return computedScenarios;
  };
  
  
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

  const calculatePoints = (scenario) => {
    return (scenario.cc.points * .01) * calculateLoan(scenario);
    //return scenario.cc.points
}
  
  const calculateCashToClose = (scenario) => {
    var ctc = scenario.downPayment + scenario.cc.aprCosts + scenario.cc.escrowFees + scenario.cc.prepaids +
              calculatePoints(scenario) - scenario.cc.contributions;
    return ctc;
  }

  const calculateLTV = (scenario) => {
    var ltv = Math.round((calculateLoan(scenario) / scenario.price) * 100);
    return ltv;
  }
  
  ;
  