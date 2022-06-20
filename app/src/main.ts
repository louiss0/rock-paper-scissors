import 'virtual:windi.css'
import "./style.css";

enum SelectedElements {
    PLAYER_PERSON = "#human-image",
    PLAYER_COMPUTER = "#computer-image",
    RPS_INPUT = "#rps-input"
}


enum RPSChoices {
    ROCK = "Rock",
    PAPER = "Paper",
    SCISSORS= "Scissors"
}

enum Icons  {
    COMPUTER = "computer",
    HUMAN = "human"
}

enum ControlledClasses {
    SCALE_0 = "scale-0",
    Z_INDEX_50= "z-50"
}

enum OneToThree {
    ONE= 1, 
    TWO = 2,
    THREE = 3,
}

enum TimerMilliseconds {
    EVALUATE_CHOICES_TIMER = 200,
    RESET_CHOICES_TIMER = 400
}

let evaluateChoicesTimer:number,
    resetChoicesTimer:number

try {
    
    startApp()
    
} catch (error) {
    
    console.error(error)
}




function startApp() {
     
   const app = document.getElementById("game-container")
    
    
    if(!app) {
    
    
        throw Error("There is non div with the id of game-container")
    }
    
    
    const
        playerImage = app.querySelector(SelectedElements.PLAYER_PERSON),
    
        computerImage = app.querySelector(SelectedElements.PLAYER_COMPUTER),
    
        rpsInput = app.querySelector<HTMLInputElement>(SelectedElements.RPS_INPUT)
    
    
    if (!playerImage || !computerImage || !rpsInput) {
        
    
        
        throw Error(`There are no elements with these id's ${
            Object.values(SelectedElements).join(" , ")
        } `)
    }

    rpsInput.addEventListener("keydown",   (event) => {
        


        if (event.key === "Enter") {
            
           const element = event.target as HTMLInputElement

        
        
            

            if (!element.validity.valid) return
                
            

            let selectedPlayerSideIconBasedOnChoice: HTMLDivElement | null,
                humanIcon: HTMLDivElement | null, 
                computerIcon: HTMLDivElement | null
            
            const playerChoice = element.value as RPSChoices


            humanIcon =
                    playerImage
                    .querySelector(`[data-icon=${Icons.HUMAN}]`)
            
            computerIcon =
                    computerImage
                    .querySelector(`[data-icon=${Icons.COMPUTER}]`)
            
            
            switch (playerChoice) {
                
                case RPSChoices.ROCK:
                case RPSChoices.PAPER:
                case RPSChoices.SCISSORS:
                    
                selectedPlayerSideIconBasedOnChoice =
                    playerImage
                    .querySelector<HTMLDivElement>(
                        `[data-icon=${playerChoice}]`
                    )
                        
                    break;
            
                default:
                    selectedPlayerSideIconBasedOnChoice = null
                    break;
            }
                
            if (!selectedPlayerSideIconBasedOnChoice) {
                

                throw Error(
                    `A data-icon with one of these values must exist ${Object.values(RPSChoices).join(" , ")}`
                )
    
            }


            if (!humanIcon) {
                
                throw Error(
                    `A data-icon with one of these values must exist ${Object.values(Icons).join(" , ")}`
                )
            }




            flipIconClassesBasedOnSides(
                selectedPlayerSideIconBasedOnChoice,
                humanIcon
            )

                
            let computerChoice =
                generateComputerRPSChoiceBasedOnANumberFromOnToThree() 
            
            const computerSideIconBasedOnChoice =
                computerImage.querySelector<HTMLDivElement>(`[data-icon=${computerChoice}]`)
            
            
            
            if (!computerSideIconBasedOnChoice || !computerIcon) {
        
                throw Error(`A data-icon with one of these values must exist ${Object.values(RPSChoices).join(" , ")} and a data icon for with the value of computer must also exist`)
        
            }
            


            
            flipIconClassesBasedOnSides(
                computerSideIconBasedOnChoice,
                computerIcon
            )
            
          evaluateChoicesTimer =  setTimeout(() => {
            
              evaluateChoices(
                  playerChoice,
                  computerChoice
              )
                
            }, TimerMilliseconds.EVALUATE_CHOICES_TIMER)

            resetChoicesTimer =
            
            setTimeout(() => {
                
                selectedPlayerSideIconBasedOnChoice
                    ?.classList.remove(ControlledClasses.Z_INDEX_50)
                selectedPlayerSideIconBasedOnChoice
                    ?.classList.add(ControlledClasses.SCALE_0)
                
                computerSideIconBasedOnChoice
                    ?.classList.remove(ControlledClasses.Z_INDEX_50)
                computerSideIconBasedOnChoice
                    ?.classList.add(ControlledClasses.SCALE_0)
                
                humanIcon
                    ?.classList.add(ControlledClasses.Z_INDEX_50)
                humanIcon
                    ?.classList.remove(ControlledClasses.SCALE_0)
                
                computerIcon
                    ?.classList.add(ControlledClasses.Z_INDEX_50)
                computerIcon
                    ?.classList.remove(ControlledClasses.SCALE_0)

            }, TimerMilliseconds.RESET_CHOICES_TIMER)



        
        }




    })

clearInterval(evaluateChoicesTimer)
clearInterval(resetChoicesTimer)



    function flipIconClassesBasedOnSides(playerIcon:HTMLDivElement, selectedIcon:HTMLDivElement) {
                
                playerIcon
                    .classList
                    .remove(ControlledClasses.SCALE_0,)
                
                playerIcon
                    .classList
                    .add(ControlledClasses.Z_INDEX_50)
                
                selectedIcon
                    .classList
                    .add(ControlledClasses.SCALE_0)
    
                selectedIcon
                    .classList
                    .remove(ControlledClasses.Z_INDEX_50)
    
                
            }



    function evaluateChoices(playerChoice: RPSChoices, computerChoice: RPSChoices)
    {
    

        const  playerChoosesRockComputerChoosesScissors = 
                playerChoice === RPSChoices.ROCK
                && computerChoice === RPSChoices.SCISSORS,

             playerChoosesPaperComputerChoosesRock = 
                playerChoice === RPSChoices.PAPER
                && computerChoice === RPSChoices.ROCK,
            
            
            playerChoosesScissorsComputerChoosesPaper = 
            playerChoice === RPSChoices.SCISSORS
                && computerChoice === RPSChoices.PAPER,
            
             playerWins = playerChoosesPaperComputerChoosesRock
                || playerChoosesScissorsComputerChoosesPaper
                || playerChoosesRockComputerChoosesScissors
            
            
            if (computerChoice === playerChoice) {
                
               return alert("There is a tie")
            }
            
            if (playerWins) {

                return alert("Player Wins")
            } 
            alert("Computer Wins")



}


        function generateComputerRPSChoiceBasedOnANumberFromOnToThree(): RPSChoices {
                
            const numberFromOneToThree =
                Math.floor(Math.random() * OneToThree.THREE) + OneToThree.ONE
                
    
                switch (numberFromOneToThree) {
                    case OneToThree.ONE:
                    default:
                        return RPSChoices.ROCK
                        
                    case OneToThree.TWO:
                        return RPSChoices.PAPER
                        
                    case OneToThree.THREE:
                        return RPSChoices.SCISSORS
                        
                
                }
                
            }
            











}









