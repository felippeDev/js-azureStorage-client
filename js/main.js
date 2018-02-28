var STORAGE_ACCOUNT = config.STORAGE_ACCOUNT;
var CONNECTION_STRING = config.CONNECTION_STRING;
var QUERY_STRING = config.QUERY_STRING;
var SAS_TOKEN = config.SAS_TOKEN;

var blobUri = 'https://' + STORAGE_ACCOUNT + '.blob.core.windows.net';
var blobService = AzureStorage.createBlobServiceWithSas(blobUri, SAS_TOKEN);
console.log(blobService);

// List blobs
// -------------------------------------------------------------------------
function listBlobs() {
  blobService.listBlobsSegmented('tests', null, function (error, results) {
    console.log('SAS: ' + SAS_TOKEN);
    if (error) {
      // List blobs error
      console.log('List blob error: ' + error);
    } else {
      for (var i = 0, blob; blob = results.entries[i]; i++) {
        // Deal with blob object
        console.log(blob);
        var blobListElement = document.getElementById("blobList");
        var blobListItem = document.createElement('li');

        var blobItemLocation = getSAS('tests', blob.name);
        console.log('Location: ' + blobItemLocation);

        var blobItem = document.createElement('a');
        blobItem.href = blobItemLocation;
        blobItem.target = '_blank';
        blobItem.textContent = blob.name;

        blobListItem.appendChild(blobItem);
        blobListElement.appendChild(blobListItem);
      }
    }
  });
}

function getSAS(containerName, blobName) {
  console.log('iosdhfiuhsduifhiusdhuihsduihdsfiuhdfsiuhsdfiu')
  var startDate = new Date();
  var expiryDate = new Date(startDate);

  expiryDate.setMinutes(startDate.getMinutes() + 100);
  startDate.setMinutes(startDate.getMinutes() - 100);

  var sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: blobService.BlobUtilities.SharedAccessPermissions.READ,
      Start: startDate,
      Expiry: expiryDate
    }
  };

  var token = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
  console.log('LOGO DO INFERNO: ' + token);
  return sasUrl = blobService.getUrl(containerName, blobName, token);
}

// Upload blob
// -------------------------------------------------------------------------
// If one file has been selected in the HTML file input element
// var file = document.getElementById('fileinput').files[0];

// var customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
// blobService.singleBlobPutThresholdInBytes = customBlockSize;

// var finishedOrError = false;
// var speedSummary = blobService.createBlockBlobFromBrowserFile('tests', file.name, file, { blockSize: customBlockSize }, function (error, result, response) {
//   finishedOrError = true;
//   if (error) {
//     // Upload blob failed
//   } else {
//     // Upload successfully
//   }
// });
// refreshProgress();

// function refreshProgress() {
//   setTimeout(function () {
//     if (!finishedOrError) {
//       var process = speedSummary.getCompletePercent();
//       displayProcess(process);
//       refreshProgress();
//     }
//   }, 200);
// }

// Download blob
// -------------------------------------------------------------------------
// var downloadLink = blobService.getUrl('tests', 'myblob', 'SAS_TOKEN');

// Delete blob
// -------------------------------------------------------------------------
// blobService.deleteBlobIfExists(container, blob, function (error, result) {
//   if (error) {
//     // Delete blob failed
//   } else {
//     // Delete blob successfully
//   }
// });