import React from "react"


export default function Welcome(props) {

    const [categorySelected, setCategorySelected] = React.useState([])
    const [difficultySelected, setDifficultySelected] = React.useState("")
    const [typeSelected, setTypeSelected] = React.useState("")

    const categories = [
        ["General", "fa-solid fa-shuffle", 9],
        ["Books", "fa-solid fa-book", 10],
        ["Film", "fa-solid fa-film", 11],
        ["Music", "fa-solid fa-music", 12],
        ["Nature", "fa-solid fa-tree", 17],
        ["Computers", "fa-solid fa-laptop", 18],
        ["Maths", "fa-solid fa-plus-minus", 19],
        ["Gadgets", "fa-solid fa-headphones", 30],
        ["Mythology", "fa-solid fa-mars-and-venus", 20],
        ["Sports", "fa-brands fa-dribbble", 21],
        ["Geography", "fa-solid fa-globe", 22],
        ["History", "fa-solid fa-clock-rotate-left", 23],
        ["Politics", "fa-solid fa-landmark", 24],
        ["Art", "fa-solid fa-palette", 25],
        ["Animals", "fa-solid fa-hippo", 27],
        ["Vehicles", "fa-solid fa-car-side", 28],
    ]


    let style = "category--buttons";

    return (
        <div className="welcome--container--flex">
            <h1 id="h1--welcome" >Quick Quiz</h1>
            <h2 id="h2--welcome">Test your knowledge</h2>

            <div id="quiz--selection--container">
                {categories.map(cat => {
                    const [catName, catIcon, catID] = cat
                    // If state of categorySelected is changed, i.e. onClick(),
                    // then additional css class will be added (below we use id)
                    return (<button
                        className={categorySelected[0] === catName
                            ? "category--buttons welcome--buttons--clicked"
                            : "category--buttons"}
                        key={cat[1]}
                        onClick={() => setCategorySelected(cat)}>
                        <i className={catIcon}></i>
                        {catName}
                    </button>)
                }
                )}

                <div id="quiz--difficulty">
                    <p>select Difficulty Level:</p>
                    <div id="difficulty--spans">
                        <button
                            className={difficultySelected === "easy" ? "dificulty--easy welcome--buttons--clicked" : "dificulty--easy"}
                            onClick={() => setDifficultySelected("easy")}>
                            Easy</button>
                        <button
                            className={difficultySelected === "medium" ? "dificulty--medium welcome--buttons--clicked" : "dificulty--medium"}
                            onClick={() => setDifficultySelected("medium")}>
                            Medium</button>
                        <button
                            className={difficultySelected === "hard" ? "dificulty--hard welcome--buttons--clicked" : "dificulty--hard"}
                            onClick={() => setDifficultySelected("hard")}>
                            Hard</button>
                        <button
                            className={difficultySelected === "any" ? "dificulty--any welcome--buttons--clicked" : "dificulty--any"}
                            onClick={() => setDifficultySelected("any")}>
                            Any</button>
                    </div>
                </div>

                <div id="quiz--type">
                    <p>select Questions Type:</p>
                    <div id="quiz--type--spans">


                        <button className={typeSelected === "boolean" ? "welcome--buttons--clicked" : ""}
                            onClick={() => setTypeSelected("boolean")}>
                            True / False</button>
                        <button className={typeSelected === "multiple" ? "welcome--buttons--clicked" : ""}
                            onClick={() => setTypeSelected("multiple")}>
                            Multi-Choice</button>
                        <button className={typeSelected === "any" ? "welcome--buttons--clicked" : ""}
                            onClick={() => setTypeSelected("any")}>
                            Any</button>
                    </div>
                </div>
            </div>

            {/* Display Go Btn only if all vars have values */}
            {
                categorySelected.length > 0 &&
                difficultySelected !== "" &&
                typeSelected !== "" &&
                <button id="goBtn" onClick={() => props.handleClick(categorySelected, difficultySelected, typeSelected)}>
                    GO!
                </button>
            }
        </div>
    )
}