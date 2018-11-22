import express from 'express'
import passport from 'passport'
const router = express.Router()

// TODO: Passport stuff

// Project model
const Project = require('../../models/Project')
// @route   GET api/projects/test
// @desc    Tests project route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Projects Works'}))

// @route   GET api/projects/config
// @desc    Config project route
// @access  Public
router.get('/config', (req, res) => res.json(
  {
    "success": true,
    "configuration": {
      "branding": {
        "general": {
          "backgroundColour": "#fff",
          "bodyFontColour": "#4D4D4F",
          "bodyFontFamily": "Montserrat",
          "bodyFontSize": "",
          "headingFontColour": "#333",
          "headingFontFamily": "Roboto",
          "headingFontSize": "",
          "logoMainUrl": "https://www.investfit.com.au/wp-content/uploads/2015/12/Investfit-Strapline-DK-GREY-CMYK.png",
          "logoSmallUrl": "https://www.investfit.com.au/wp-content/uploads/2015/12/Investfit-Strapline-DK-GREY-CMYK.png",
          "logoFaviconUrl": "https://www.investfit.com.au/wp-content/uploads/2015/12/Investfit-Strapline-DK-GREY-CMYK.png",
          "logoPoweredByUrl": "https://www.investfit.com.au/wp-content/uploads/2015/12/Investfit-Strapline-DK-GREY-CMYK.png",
          "logoSquareUrl": "link to the thumbnail",
          "colourPrimary": "#00AAE9",
          "colourSecondary1": "#F96E5B",
          "colourSecondary2": "#E11D02",
          "colourSecondary3": "#72B331",
          "colourSecondary4": "#4A90E2",
          "colourSecondary5": "#C5EBF9"
        },
        "header": {
          "backgroundColour": "",
          "backgroundOverlay": "squiggle.png",
          "logoText": "",
          "titleFontColour": "",
          "titleFontWeight": "",
          "titleFontSize": ""
        },
        "footer": {},
        "splash": {
          "backgroundColour": "#00AAE9"
        },
        "chartColours": {
          "grey": "#7b7b7b",
          "defaultColour": "#78a3e8",
          "offsetColour": "#ff7e00",
          "currentStrategy": "#ad4064",
          "currentStrategyInverse": "rgb(50,50,50)",
          "optimalStrategy": "#78a3e8",
          "optimalStrategyInverse": "rgb(255,255,255)",
          "confidenceLevels": [
            "rgb(8, 23, 255)",
            "rgb(8, 255, 11)",
            "rgb(255, 150, 8)",
            "rgb(255, 8, 8)"
          ],
          "incomeInvestment": "#729ACA",
          "incomePension": "#CD7371",
          "incomeCapital": "#AFC97A",
          "incomeEquity": "#8064A2",
          "allModelledPortfoliosGreyscale": false
        }
      },
      "country": {
        "details": {
          "name": "Australia",
          "currencyCode": "AUD",
          "currencyName": "Australian Dollar",
          "currencySymbol": "$",
          "thousandsSeparator": ",",
          "decimalSeparator": ".",
          "moduleId": "AUS"
        },
        "assumptions": {
          "averageWeeklyEarnings": 3,
          "consumerPriceIndex": 2,
          "exchangeRates": [
            {
              "currency": "USD",
              "return": 0
            },
            {
              "currency": "GBP",
              "return": 0
            },
            {
              "currency": "EUR",
              "return": 0
            },
            {
              "currency": "CNY",
              "return": 0
            }
          ],
          "assetClasses": [
            {
              "name": "cash",
              "engine": "CA",
              "label": "Cash",
              "canBeHeld": true,
              "return": 3,
              "dividend": 3,
              "country": "AUS",
              "currency": "AUD"
            },
            {
              "name": "bonds",
              "engine": "FI",
              "label": "Bonds",
              "canBeHeld": true,
              "return": 4.5,
              "dividend": 3.5,
              "country": "AUS",
              "currency": "AUD"
            },
            {
              "name": "property",
              "engine": "PR",
              "label": "Property",
              "canBeHeld": true,
              "return": 7,
              "dividend": 3.5,
              "country": "AUS",
              "currency": "AUD"
            },
            {
              "name": "internationalEquity",
              "engine": "OE",
              "label": "International Equity",
              "canBeHeld": true,
              "return": 8,
              "dividend": 3,
              "country": "AUS",
              "currency": "USD"
            },
            {
              "name": "australianEquity",
              "engine": "EQ",
              "label": "Australian Equity",
              "canBeHeld": true,
              "return": 8,
              "dividend": 4,
              "country": "AUS",
              "currency": "AUD"
            },
            {
              "name": "gold",
              "engine": "GOLD",
              "label": "Gold",
              "canBeHeld": true,
              "return": 5,
              "dividend": 0,
              "country": "AUS",
              "currency": "USD"
            },
            {
              "name": "gold",
              "engine": "GOLD",
              "label": "Gold",
              "canBeHeld": true,
              "return": 5,
              "dividend": 0,
              "country": "AUS",
              "currency": "USD"
            }
          ],
          "superContributionFee": 0,
          "otherContributionFee": 0,
          "superAssetsFeePercentage": 1,
          "otherAssetsFeePercentage": 0.7,
          "superAnnualFee": 0,
          "otherAnnualFee": 0,
          "superInsurancePremiumEscalation": 0,
          "otherInsurancePremiumEscalation": 0,
          "dividendFrankedProportion": 65,
          "debtRateMargin": 3.5,
          "insuranceNeedsHouseholdFixedCosts": 20,
          "insuranceNeedsChildFundingAge": 25,
          "assetAllocations": {
            "conservative": {
              "cash": 20,
              "bonds": 50,
              "property": 10,
              "australianEquity": 10,
              "internationalEquity": 10,
              "gold": 0
            },
            "moderate": {
              "cash": 10,
              "bonds": 40,
              "property": 10,
              "australianEquity": 20,
              "internationalEquity": 20,
              "gold": 0
            },
            "balanced": {
              "cash": 5,
              "bonds": 30,
              "property": 15,
              "australianEquity": 30,
              "internationalEquity": 20,
              "gold": 0
            },
            "growth": {
              "cash": 5,
              "bonds": 10,
              "property": 15,
              "australianEquity": 40,
              "internationalEquity": 30,
              "gold": 0
            },
            "aggressive": {
              "cash": 0,
              "bonds": 0,
              "property": 20,
              "australianEquity": 40,
              "internationalEquity": 40,
              "gold": 0
            }
          }
        },
        "regulatory": {
          "superContributionTaxRate": 15,
          "superInvestmentTaxRate": 15,
          "incomeTax": [
            {
              "threshold": 0,
              "rate": 0
            },
            {
              "threshold": 18200,
              "rate": 19
            },
            {
              "threshold": 37000,
              "rate": 32.5
            },
            {
              "threshold": 90000,
              "rate": 37
            },
            {
              "threshold": 180000,
              "rate": 45
            }
          ],
          "corporateTaxRate": 30,
          "superZeroTaxThreshold": 1600000,
          "sgcRate": {
            "2018": 9.5,
            "2022": 10,
            "2023": 10.5,
            "2024": 11,
            "2025": 11.5,
            "2026": 12
          },
          "medicareLevy": 2,
          "preservationAge": {
            "1904": 55,
            "1961": 56,
            "1962": 57,
            "1963": 58,
            "1964": 59,
            "1965": 60
          },
          "minimumPensionProportion": {
            "1": 0,
            "55": 4,
            "65": 5,
            "75": 6,
            "80": 7,
            "85": 9,
            "90": 11,
            "95": 14
          },
          "agePensionFullAccessAge": 65,
          "agePensionEntitlementAge": {
            "1904": 65,
            "1952": 66,
            "1957": 67
          },
          "agePensionAmount": {
            "1": 916,
            "2": 1381
          },
          "agePensionDeemingThreshold": {
            "1": 49200,
            "2": 81600
          },
          "agePensionDeemingRate": {
            "1": 1.75,
            "2": 3.25
          },
          "agePensionIncomeThreshold": {
            "1": 172,
            "2": 304
          },
          "agePensionIncomeReduction": 50,
          "agePensionWorkBonus": 6500,
          "agePensionAssetsReduction": 0.3,
          "agePensionAssetsThreshold": {
            "1": {
              "OwnHome": {
                "FALSE": 465500,
                "TRUE": 258500
              }
            },
            "2": {
              "OwnHome": {
                "FALSE": 594500,
                "TRUE": 387500
              }
            }
          },
          "asfaComfortableIncome": {
            "1": 42764,
            "2": 60264
          },
          "currentScgRate": 9.5
        }
      },
      "account": {
        "licence": {
          "modules": [
            {
              "id": "optimisation",
              "enabled": true,
              "default": true
            },
            {
              "id": "insurance",
              "enabled": true,
              "default": true
            },
            {
              "id": "review",
              "enabled": true,
              "default": false
            },
            {
              "id": "leadGeneration",
              "enabled": true,
              "formViewId": "FREf34fl34",
              "submitAction": "",
              "thankyouViewId": "GTGf45eGRE"
            },
            {
              "id": "trialSignup",
              "enabled": false,
              "practiceId": "enp1jC54Ltu7fCt6qd59",
              "expireAfterDays": 31,
              "userType": "Client Trial"
            },
            {
              "id": "directUserAccess",
              "enabled": true
            }
          ],
          "roleActions": {
            "advisor": {
              "reports": [
                "view_strategy"
              ]
            },
            "clientAdmin": {
              "reports": [
                "view_strategy"
              ]
            },
            "developmentStaff": {
              "reports": [
                "view_strategy"
              ]
            },
            "direct": {
              "reports": [
                "view_strategy_after_payment"
              ]
            },
            "groupAdmin": {
              "reports": [
                "view_strategy"
              ]
            },
            "investfitStaff": {
              "reports": [
                "view_strategy"
              ]
            },
            "partner": {
              "reports": [
                "view_strategy"
              ]
            },
            "practiceAdmin": {
              "reports": [
                "view_strategy"
              ]
            },
            "trial": {
              "reports": [
                "view_strategy"
              ]
            }
          }
        }
      },
      "setup": {
        "available": {
          "languages": [
            {
              "id": "en_AU",
              "name": "English (Australian)"
            },
            {
              "id": "de_DE",
              "name": "Deutch (Deutchland)"
            }
          ]
        },
        "core": {
          "riskSegments": [
            {
              "id": "conservative",
              "title": "Conservative",
              "subtitle": "r.riskSubtitle1",
              "colour": "#4b59e5",
              "breakpoint": 11
            },
            {
              "id": "moderate",
              "title": "Moderate",
              "subtitle": "r.riskSubtitle2",
              "colour": "#3ce53a",
              "breakpoint": 16
            },
            {
              "id": "balanced",
              "title": "Balanced",
              "subtitle": "r.riskSubtitle3",
              "colour": "#e5d43e",
              "breakpoint": 24
            },
            {
              "id": "growth",
              "title": "Growth",
              "subtitle": "r.riskSubtitle4",
              "colour": "#e58643",
              "breakpoint": 32
            },
            {
              "id": "aggressive",
              "title": "Aggressive",
              "subtitle": "r.riskSubtitle5",
              "colour": "#e54745",
              "breakpoint": 100
            }
          ],
          "riskSegmentIfUnsure": "balanced",
          "confidenceLevels": [
            50,
            75,
            90,
            95
          ],
          "confidenceLevelsNew": [
            {
              "id": "50",
              "title": "Low",
              "colour": "rgb(8, 23, 255)",
              "value": 50
            },
            {
              "id": "75",
              "title": "Medium",
              "colour": "rgb(8, 255, 11)",
              "value": 75
            },
            {
              "id": "90",
              "title": "High",
              "colour": "rgb(255, 150, 8)",
              "value": 90
            },
            {
              "id": "95",
              "title": "Very High",
              "colour": "rgb(255, 8, 8)",
              "value": 95
            }
          ]
        },
        "system": {
          "yearsToProject": 75,
          "ageLimit": 115,
          "legacyTolerance": 25,
          "maximumLoops": 30,
          "optimalBenefitThresholdPercentage": 105,
          "pensionRounding": 1000,
          "legacyRounding": 10000,
          "whatIfISaveAdditionalIncomePercentage": 5
        },
        "env": "latest"
      },
      "user": {
        "preferences": {
          "language": "en_AU",
          "hideDescriptions": false
        },
        "details": {
          "type": "direct",
          "viewStrategyStatus": "active",
          "viewType": "full"
        },
        "relations": {
          "client": "base",
          "group": "base",
          "practice": "base"
        }
      },
      "input": {
        "dataFiles": {
          "portfolioData": "port_base_200_181030",
          "simulationData": "sh5iHMD873FzPj"
        },
        "defaults": {
          "core": {
            "iterations": {
              "value": 100
            },
            "combined": {
              "home": {
                "debt": {
                  "current": null,
                  "term": null,
                  "atRetirement": null
                },
                "equityRelease": 0,
                "isOwnHome": true,
                "valuation": 0,
                "rentWeekly": 0
              },
              "target": {
                "confidenceLevel": 90
              }
            },
            "persons": {
              "home": {
                "equitySharePercentage": 50
              },
              "target": {
                "retirementAge": 65,
                "retirementIncome": null,
                "legacy": 0,
                "shortfallAge": 90,
                "shortTermRiskPercentage": 100
              },
              "details": {
                "age": 40
              },
              "other": {
                "debt": 0,
                "insurancePremium": {
                  "amount": 0,
                  "escalation": 0,
                  "frequency": 1
                },
                "managementFee": {
                  "annual": {
                    "fixedAmount": 0,
                    "percentageOfAssets": 0.7
                  }
                },
                "savings": {
                  "amount": 0,
                  "frequency": 1
                }
              },
              "super": {
                "assetAllocationCategory": "balanced",
                "contributions": {
                  "concessional": {
                    "other": {
                      "amount": 0,
                      "frequency": 1
                    }
                  },
                  "nonConcessional": {
                    "amount": 0,
                    "frequency": 1
                  }
                },
                "debt": 0,
                "insurancePremium": {
                  "amount": 0,
                  "escalation": 0,
                  "frequency": 1
                },
                "managementFee": {
                  "annual": {
                    "fixedAmount": 0,
                    "percentageOfAssets": 1
                  }
                },
                "totalAssets": 0
              },
              "withdrawals": {
                "advisorFee": {
                  "annual": {
                    "fixedAmount": 0,
                    "percentageOfAssets": 0
                  },
                  "upfrontAmount": 0
                },
                "other": {
                  "amount": 0,
                  "frequency": 1
                }
              },
              "work": {
                "income": 0,
                "incomeGrowth": 3,
                "status": "employed"
              }
            }
          },
          insuranceNeeds: {
            ageYoungestChild: 0,
            childFundingAge: 25,
            children: 0,
            requiredIncome: {
              calculationType: "householdFixedCostsPercentage",
              value: 0,
              replacementIncomePercentage: 75,
              householdFixedCostsPercentage: 33
            }
          }
        },
        "validation": {
          "core": {
            "combined": {},
            "persons": {
              "target": {
                "retirementAge": {
                  "max": 90
                }
              },
              "details": {
                "age": {
                  "min": 0,
                  "max": 100
                }
              }
            }
          }
        }
      }
    }
  }
))

// @route   GET api/projects
// @desc    Get projects
// @access  Public
router.get('/', (req, res) => {
    Project.find()
      .sort({ dateCreated: -1 })
      .then(projects => res.json(projects))
      .catch(err => res.status(404).json({ error: 'No projects found' }))
  })

// @route   POST api/projects
// @desc    Create project
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id
        // TODO: thumbnail

      })
  
      newProject.save().then(project => res.json({
        message: 'Successfully posted',
        project
      }))
    }
)

// @route   GET api/projects/:id
// @desc    Get project
// @access  Private
router.get(
  '/:id',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const projectId = req.params.id
    Project.findById(projectId, (err, project) => {
      if (err) {
        res.status(404).json({error: 'Project not found'})
      } else {
        res.json({
          message: 'Project found',
          project          
        })
      }
    })

  }
)

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private
router.delete(
  '/:id',
  // TODO: Auth
  (req, res) => {
      Project.findById(req.params.id)
      .then(project => {
        // TODO: Check for project owner
        // if (project.user.toString() !== req.user.id) {
        //   return res
        //     .status(401)
        //     .json({ notauthorized: 'User not authorized' })
        // }

        // Delete
        project.remove().then(() => res.json({ message: 'Successfully deleted' }))
      })
      .catch(err => res.status(404).json({ error: 'Project not found' }))
  }
)

module.exports = router
