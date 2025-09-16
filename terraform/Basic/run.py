import subprocess
import os

def run_terraform(directory=".", commands=None):
    """Run a list of Terraform commands in the specified directory"""
    if commands is None:
        commands = [["terraform", "init"]]   # default

    # Change to the specified directory
    os.chdir(directory)

    for cmd in commands:
        full_cmd = ["terraform"] + cmd   # prepend terraform
        print(f"\n>>> Running: {' '.join(full_cmd)}")
        result = subprocess.run(full_cmd, check=True, capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print(result.stderr)

if __name__ == "__main__":
    terraform_commands = [
        # ["plan", "-out=tfplan"],              # will run as: terraform plan
        ["destroy", "-auto-approve"]   # uncomment to run apply
    ]

    run_terraform(".", terraform_commands)
