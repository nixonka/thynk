
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Thynk.Application.Storage;
using Thynk.Application.Wrappers;

namespace Discounts.Application.Storage
{
    public partial class CreateBlobItemCommand : IRequest<Response<BlobItemViewModel>>
    {
        public IFormFile File { get; set; }
    }

    public class CreateBlobItemCommandHandler : IRequestHandler<CreateBlobItemCommand, Response<BlobItemViewModel>>
    {

        public CreateBlobItemCommandHandler(IServiceProvider serviceProvider)
        {
        }

        public async Task<Response<BlobItemViewModel>> Handle(CreateBlobItemCommand request, CancellationToken cancellationToken)
        {
            var file = request.File;
            var filePath = Path.GetTempPath() + file.FileName;
            if (file.Length > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            return new Response<BlobItemViewModel>(new BlobItemViewModel(file.FileName));
        }
    }
}
