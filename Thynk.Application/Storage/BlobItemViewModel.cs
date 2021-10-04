using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Thynk.Application.Storage
{
    public class BlobItemViewModel
    {
        public string path { get; set; }
        public BlobItemViewModel(string filePath)
        {
            path = filePath;
        }
    }
}
