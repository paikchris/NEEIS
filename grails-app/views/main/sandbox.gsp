
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main">

</head>
<body>
HelloWorld


<div class= "form-group">
        <label class="control-label">Address</label>

        <input class="form-control" placeholder="Street" type="text" name="street_number" id="autoFill" onFocus="geolocate()"/>
    </div>
    <div>
        <input class="form-control" placeholder="City" type="text" name="locality"/>
    </div>
    <div>
        <input class="form-control" placeholder="State" type="text" name="administrative_area_level_1"/>

        <div>
            <input class="form-control" placeholder="Country" type="text" name="country"/>
        </div>
    <div>
        <input class="form-control" placeholder="ZIP" type="text" name="postal_code"/>
    </div>
<script src="${resource(dir: 'js', file: 'sandbox.js')}"></script>
</body>
</html>