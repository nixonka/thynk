using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Thynk.Application.Storage
{
    public class BlobInfo
    {
        public BlobInfo(Stream content, string contentType)
        {
            Content = content;
            ContentType = contentType;
        }

        public Stream Content { get; set; }
        public string ContentType { get; set; }
    }
}
