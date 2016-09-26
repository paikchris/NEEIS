<body>

<div class="form-group">
    <label for="nameOfCorporation">Name Of Corporation</label>
    <g:textField type="text" class="form-control" name="nameOfCorporation" placeholder="Corporation Name"/>
</div>
<div class="form-group">
    <label for="taxIdNumber">Tax ID Number</label>
    <g:textField type="text" class="form-control" name="taxIdNumber" placeholder="Tax ID Number"/>
</div>
<div class="form-group">
    <label for="website">Website</label>
    <g:textField type="text" class="form-control" name="website" placeholder="website"/>
</div>
<div class="form-group">
    <label for="stateOfIncorporation">State of Incorporation</label>
    <g:textField type="text" class="form-control" name="stateOfIncorporation" placeholder="State of Incorporation"/>
</div>
<div class="form-group">
    <label for="requestedEffectiveDate">Requested Effective Date</label>
    <g:textField type="text" class="form-control" name="requestedEffectiveDate" placeholder="Requested Effective Data"/>
</div>

<div class="col-xs-12">
    <div class = "form-group">
        <label class="control-label">Mailing Address </label>
        <div id="mailingAddress">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">Mailing Address #1</h3>
                </div>
                <div class="panel-body">
                    <div class = "form-group col-xs-4">
                        <input class="form-control" type="text" placeholder = "Street address" name="streetName" />
                    </div>
                    <div class="form-group col-xs-4">
                        <input class="form-control" type="text" placeholder = "City" name="city" />
                    </div>
                    <div class="form-group col-xs-2">
                        <input class="form-control" type="text" placeholder = "State" name="state" />
                    </div>
                    <div class="form-group col-xs-2">
                        <input class="form-control" type="text" placeholder = "Zip Code" name="zipCode" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<h4 class="title"> Check the Profession which applies to this applicant: </h4>
<p><input type="checkbox" name="actorActress" /> Actor / Actress </p>
<p><input type="checkbox" name="author" /> Author </p>
<p><input type="checkbox" name="cameraOperator" /> Camera Operator </p>
<p><input type="checkbox" name="comedian" /> Comedian </p>
<p><input type="checkbox" name="composer" /> Composer </p>
<p><input type="checkbox" name="director" /> Director </p>
<p><input type="checkbox" name="magician" /> Magician </p>
<p><input type="checkbox" name="model" /> Model </p>
<p><input type="checkbox" name="musician" /> Musician </p>
<p><input type="checkbox" name="producer" /> Producer </p>
<p><input type="checkbox" name="radioTvBroadcasting" /> Radio / TV Broadcasting </p>
<p><input type="checkbox" name="singer" /> singer </p>
<p><input type="checkbox" name="speaker" /> speaker </p>
<p><input type="checkbox" name="sportsFigure" /> Sports Figure </p>
<p><input type="checkbox" name="writer" /> Writer </p>
<p><input type="checkbox" name="other" /> Other </p>
<div class="form-group">
    <g:textField type="text" class="form-control" name="other" placeholder=""/>
</div>

</body>