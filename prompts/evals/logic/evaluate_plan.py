import os

import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def evaluate_plan(plan: str) -> str:
    """
    Evaluate the plan and return a summary of the plan.
    """
    
    prompt = open("evals/logic/logic-eval-prompt.txt", "r").read()
    print('Consulting Evaluator')
    response = openai.chat.completions.create(
        model="gpt-5",
        messages=[{"role": "user", "content": prompt}, {"role": "user", "content": f"Here is the plan: {plan}"}],
        response_format={"type": "json_object"}
    )
    print('Got Response')
    return response.choices[0].message.content


if __name__ == "__main__":
    file_path = "/Users/chris/Documents/Code/startable/evaluated/startup_roadmap_evaluation_2.md"
    plan = open(file_path, "r").read()
    print('Got Plan')
    print(evaluate_plan(plan))