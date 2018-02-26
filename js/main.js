var STORAGE_ACCOUNT = config.STORAGE_ACCOUNT;
var CONNECTION_STRING = config.CONNECTION_STRING;
var QUERY_STRING = config.QUERY_STRING;
var SAS_TOKEN = config.SAS_TOKEN;

var blobUri = 'https://' + STORAGE_ACCOUNT + '.blob.core.windows.net';
var blobService = AzureStorage.createBlobServiceWithSas(blobUri, SAS_TOKEN);

// List blobs
// -------------------------------------------------------------------------
blobService.listBlobsSegmented('mycontainer', null, function (error, results) {
  if (error) {
    // List blobs error
  } else {
    for (var i = 0, blob; blob = results.entries[i]; i++) {
      // Deal with blob object
      console.log(i);
    }
  }
});

// Upload blob
// -------------------------------------------------------------------------
// If one file has been selected in the HTML file input element
var file = document.getElementById('fileinput').files[0];

var customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
blobService.singleBlobPutThresholdInBytes = customBlockSize;

var finishedOrError = false;
var speedSummary = blobService.createBlockBlobFromBrowserFile('mycontainer', file.name, file, { blockSize: customBlockSize }, function (error, result, response) {
  finishedOrError = true;
  if (error) {
    // Upload blob failed
  } else {
    // Upload successfully
  }
});
refreshProgress();

// aux.
function refreshProgress() {
  setTimeout(function() {
      if (!finishedOrError) {
          var process = speedSummary.getCompletePercent();
          displayProcess(process);
          refreshProgress();
      }
  }, 200);
}

// Download blob
// -------------------------------------------------------------------------
var downloadLink = blobService.getUrl('mycontainer', 'myblob', 'SAS_TOKEN');

// Delete blob
// -------------------------------------------------------------------------
blobService.deleteBlobIfExists(container, blob, function(error, result) {
  if (error) {
      // Delete blob failed
  } else {
      // Delete blob successfully
  }
});