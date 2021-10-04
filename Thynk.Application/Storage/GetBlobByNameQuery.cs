using MediatR;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Wrappers;

namespace Thynk.Application.Storage
{
    public class GetBlobByNameQuery : IRequest<Response<BlobInfo>>
    {
        public string Name { get; set; }

        public class GetBlobByNameQueryHandler : IRequestHandler<GetBlobByNameQuery, Response<BlobInfo>>
        {

            public GetBlobByNameQueryHandler(IServiceProvider serviceProvider)
            {
            }

            public async Task<Response<BlobInfo>> Handle(GetBlobByNameQuery query, CancellationToken cancellationToken)
            {
                var filePath = Path.GetTempPath() + query.Name;

                var stream = File.OpenRead(filePath);

                return new Response<BlobInfo>(new BlobInfo(stream, "application/octet-stream"));
            }
        }
    }
}
