resource "aws_s3_bucket" "s3_bucket" {
  bucket = "ahyaemon-react-amplify-sample-frontend"
  acl    = "private"
}
