First steps toward implementing Evals for the project

Two approaches were explored: 
1. Using the eval orchestration via [promptfoo](https://www.promptfoo.dev/) -> install using homebrew `brew install promptfoo`
2. Running a complex eval prompt that decodes and assesses the underlying logic of the produced roadmap to check for logical errors -> `uv run evals/logic/evaluate_plan.py`

## On Promptfoo

The promptfoo orchestration is great for unit-test like evals. It can probably also scale up to e2e test like ones but this takes a bit more time breaking down the complex eval steps needed for this. 

I copied one of the example prompt setups in `evals/self-grading/` you can try running this by `cd`-in into the directory and running `promptfoo eval`