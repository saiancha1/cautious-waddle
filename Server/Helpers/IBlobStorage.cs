using System;
using System.Threading.Tasks;
using cautious_waddle.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
namespace cautious_waddle.Helpers {

public interface IBlobStorage {


CloudStorageAccount GetStorageAccount ();
Task<ImageModel> UploadFileAsync(CloudStorageAccount storageAccount, IFormFile file, HttpContext httpContext);
}
}