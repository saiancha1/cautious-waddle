using System;
using cautious_waddle.Models;
using Newtonsoft.Json;

namespace cautious_waddle.Models
{
public class CompanyUser{

    [JsonProperty("id")]
    public string Id {get;set;}
    [JsonIgnore]
    public virtual Company Company {get;set;}
    }
}