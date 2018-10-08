using System;
using Newtonsoft.Json;

namespace cautious_waddle.ViewModels {

    public class ImageModel {
    
    [JsonProperty("imageUrl")]
    public string ImageUrl {get; set;}
    }
}