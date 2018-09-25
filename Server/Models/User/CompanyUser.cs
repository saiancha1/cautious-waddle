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
<<<<<<< HEAD:Models/User/CompanyUser.cs
    }
}
=======
    [JsonProperty("CompanyUserId")]
    public int Identifier {get;set;}
    }
>>>>>>> master:Server/Models/User/CompanyUser.cs
