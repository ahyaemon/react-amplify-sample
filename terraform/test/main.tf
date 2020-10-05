provider "aws" {
  profile = "amplify-tutorial"
  region  = "ap-northeast-1"
}

resource "aws_iam_user" "user" {

  name = "super-max"

  tags = {
    createdBy = "terraform"
  }
}
