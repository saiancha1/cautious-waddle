using System;
using System.Threading.Tasks;
using cautious_waddle.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace cautious_waddle.Helpers {
    public  class BlobStorageHelper : IBlobStorage{
        public IConfiguration _config {get;}

        public  BlobStorageHelper (IConfiguration configuration)
        {
            _config = configuration;           
        }

        public CloudStorageAccount GetStorageAccount ()
        {
            string connString = _config["ConnectionStrings:StorageConnectionString"];
            CloudStorageAccount.TryParse(connString, out CloudStorageAccount storageAccount);
            return storageAccount;
        }

        public async Task<ImageModel> UploadFileAsync (CloudStorageAccount storageAccount, IFormFile file, HttpContext httpContext)
        {
            string userId = IdentityHelper.GetUserId(httpContext);
            
            var blobClient = storageAccount.CreateCloudBlobClient();
                    var container = blobClient.GetContainerReference("capstone");
                   var cloudBlockBlob = container.GetBlockBlobReference(userId+file.FileName);

                   using(var stream = file.OpenReadStream()) {
                     await cloudBlockBlob.UploadFromStreamAsync(stream);
                    }
            ImageModel model = new ImageModel();
            model.ImageUrl = cloudBlockBlob.StorageUri.PrimaryUri.AbsoluteUri;
            return model;
        }

    }
}