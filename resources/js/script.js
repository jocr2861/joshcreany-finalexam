let searchButton = document.getElementById("searchButton");
let searchText = document.getElementById("searchTextBox");

searchButton.onclick = function() {
    var url = `https://reststop.randomhouse.com/resources/works/?start=0&max=12&expandLevel=1&search=${searchText.value}`;
    var work_string = ``;
    //console.log(url);
    $.ajax({url:url, dataType:"json"}).then(function(data) { //calls API with the provided parameters and returns a JSON object
        //console.log(data);
        for(i in data.work) { //for each photo in the JSON object, create an bootstrap card object string to append to the HTML page
            var title = data.work[i].titleweb;
            var author = data.work[i].authorweb;
            // console.log(title);
            // console.log(author);
            work_string += `
                <div class="col-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-text">`+title+`</h5>
                            <p class="card-text">`+author+`</p>    
                            <button class="card-btn btn btn-primary" onclick="document.getElementById('myModal').hidden = false; document.getElementById('bookNameField').value = '`+title+`';">Add Review</button>
                        </div>
                    </div>
                </div>`;
        }
        document.getElementById("response_pool").innerHTML = work_string;
    });
}

document.getElementById("submitReviewButton").onclick = function() {
    console.log("Adding review.....")
}