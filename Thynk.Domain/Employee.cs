using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Thynk.Domain
{
    public class Employee : BaseEntity
    {
        public string Name { get; set; }
        public string Job { get; set; }
        public string Motto { get; set; }
        public string Hobbies { get; set; }
        public string Hometown { get; set; }
        public string PersonalBlog { get; set; }

    }
}
