crm.ready(function() {
var elementId = "select[id$='_secterr']";
//or to test in the main management list use
//#Terr_ParentID option

var options = $(elementId+' option');
    var arr = options.map(function(index, o) {
				return {
            _id: (index+1),
            parent: 0,
            text: $(o).text(),
            value: o.value,
            level: findBlanks($(o).html(),o.value),
            selected: $(o).is(':selected')
        };
    }).get();

//find parent
    arr.forEach(function(obj,ind){
      	if(obj.parent == 0 && obj.level != 0)
      	{
        	for(var i = ind-1;i > -1; i--)
          {
          	if(arr[i].level < obj.level)
            	{obj.parent = arr[i]._id; break;}
          }
        }
      });

//find blanks to get levels
//levels are used to find parents
    function findBlanks(t,v){
			matches = t.match(/&nbsp;/g);
			if(matches != null){
         return matches.length;
      }
      return 0;
		}

var sortedArr = sorting(arr);
    options.each(function(i, o) {
        //console.log(i);
        o.value = sortedArr[i].value;
        $(o).text(sortedArr[i].text);
        if(sortedArr[i].selected)$(o).prop("selected", true);
    });
});

function sorting(workingArr)
{
var hashArr = {};

for (var i=0; i<workingArr.length; i++) {
  if (hashArr[workingArr[i].parent] == undefined) hashArr[workingArr[i].parent] = [];
  hashArr[workingArr[i].parent].push(workingArr[i]);
}

var result = hierarhySort(hashArr, 0, []);
return result;

function hierarchySortFunc(a,b ) {
  return a.text.trim() > b.text.trim() ? 1 : a.text.trim() < b.text.trim() ? -1 : 0;
}

function hierarhySort(hashArr, key, result) {
  if (hashArr[key] == undefined) return;
  var workingArr = hashArr[key].sort(hierarchySortFunc);
  for (var i=0; i<workingArr.length; i++) {
    result.push(workingArr[i]);
    hierarhySort(hashArr, workingArr[i]._id, result);
  }
  return result;
}
}
