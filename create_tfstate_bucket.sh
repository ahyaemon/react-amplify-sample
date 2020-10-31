BUCKET_NAME=ahyaemon-react-amplify-sample-tfstate
REGION=ap-northeast-1
PROFILE=amplify-tutorial

echo create bucket
aws --region $REGION s3api create-bucket \
  --create-bucket-configuration LocationConstraint=$REGION \
  --bucket $BUCKET_NAME \
  --profile $PROFILE

echo enable versioning
aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled \
  --profile $PROFILE

echo encryption
aws s3api put-bucket-encryption \
  --bucket $BUCKET_NAME \
  --server-side-encryption-configuration '{
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "AES256"
        }
      }
    ]
  }' \
  --profile $PROFILE

echo block public access
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration '{
    "BlockPublicAcls": true,
    "IgnorePublicAcls": true,
    "BlockPublicPolicy": true,
    "RestrictPublicBuckets": true
  }' \
  --profile $PROFILE
