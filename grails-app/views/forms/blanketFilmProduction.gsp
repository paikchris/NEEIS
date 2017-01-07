
<div class="col-xs-12">
    <div id="insuredInfo">
        <div class="col-xs-6">
            <div class="form-group">

<div class="form-group">
    <label for="ownersNameAndTitle"> Owner's Name And Title</label>
    <g:textField type="text" class="form-control" name="ownersNameAndTitle" placeholder="Name / Title"/>
</div>
%{--<div class="form-group">--}%
    %{--<label for="applicantIsA">Applicant is a:</label>--}%
    %{--<p><input type="checkbox" name="applicantCorporation" /> Corporation </p>--}%
    %{--<p><input type="checkbox" name="applicantIndividual" /> Individual </p>--}%
    %{--<p><input type="checkbox" name="applicantPartnership" /> Partnership </p>--}%
    %{--<p><input type="checkbox" name="applicantOther" /> Other: </p>--}%
    %{--<g:textField type="text" class="form-control" name="describeOther" placeholder=""/>--}%
%{--</div>--}%
<div class="form-group">
    <label for="auditContact">Audit Contact</label>
    <g:textField type="text" class="form-control" name="auditContact" placeholder=""/>
</div>

</div>
            </div>
        </div>
                <div id="riskSpecificInfo">
                    <div class="col-xs-6">

<div class="form-group">
    <label for="estimatedAnnualGrossProductionCosts">Estimated Annual Gross Production Costs</label>
    <g:textField type="text" class="form-control" name="estimatedAnnualGrossProductionCosts" placeholder=""/>
</div>



    <div class="form-group">
    <label for="typesOfProductions">Types of Productions</label>

    <p><input type="checkbox" name="commercials" id="commercialsCheckBox"/> Commercials </p>
        <div class="form-group">
            <g:textField type="text" class="form-control" name="commercialsPercent" id="blanketFilmCommercial" placeholder="% Of Commercial Productions" style="display:none"/>
        </div>
    <p><input type="checkbox" name="webSeries" id="webSeriesCheckBox"/> Web Series </p>
        <div class="form-group">
            <g:textField type="text" class="form-control" name="webSeriesPercent" id="blanketFilmWebSeries" placeholder="% Of Web Series Productions" style="display:none"/>
        </div>
    <p><input type="checkbox" name="musicVideos" id="musicVidoesCheckBox"/> Music Videos </p>
        <div class="form-group">
            <g:textField type="text" class="form-control" name="musicVideosPercent" id="blanketFilmMusicVideos" placeholder="% Of Music Video Productions" style="display:none"/>
        </div>
    <p><input type="checkbox" name="documentaries" id="documentariesCheckBox" /> Documentaries </p>
        <div class="form-group">
            <g:textField type="text" class="form-control" name="documentariesPercent" id="blanketFilmDocumentaries" placeholder="% Of Documentary Productions" style="display:none"/>
        </div>
    <p><input type="checkbox" name="animatedProjects" id="animatedProjectsCheckBox"/> Animated Projects </p>
        <div class="form-group">
            <g:textField type="text" class="form-control" name="animatedProjectsPercent" id="blanketFilmAnimatedProjects" placeholder="% Of Animated Project Productions" style="display:none"/>
        </div>
    <p><input type="checkbox" name="others" id="othersCheckBox"/> Others </p>
        <div class="form-group">
            <g:textField type="text" class="form-control" name="othersPercent" id="blanketFilmOthers" placeholder="% Of Other Productions" style="display:none"/>
        </div>
    </div>


<div class="form-group">
    <label for="nameThreeMajorClients"> Name three of your major clients</label>
    <g:textField type="text" class="form-control" name="nameThreeMajorClientsOne" placeholder="Client #1"/>
    <g:textField type="text" class="form-control" name="nameThreeMajorClientsTwo" placeholder="Client #2"/>
    <g:textField type="text" class="form-control" name="nameThreeMajorClientsThree" placeholder="Client #3"/>
</div>

<div class="form-group">
    <label for="estimatedNumberOfProductionsEachYear"> Estimated Number of Productions each year</label>
    <g:textField type="text" class="form-control" name="estimatedNumberOfProductionsEachYear" placeholder=""/>
</div>
%{--<div class="form-group">--}%
    %{--<label for="filmingLocations"> Filming Locations(s)</label>--}%
    %{--<g:textField type="text" class="form-control" name="filmingLocations" placeholder=""/>--}%
%{--</div>--}%
<!-- must be able to add additional locations-->
<div class="form-group">
    <label for="percentageProductionOutsideCountryOfOrigin"> Percentage of production outside country of origin</label>
    <g:textField type="text" class="form-control" name="percentageProductionOutsideCountryOfOrigin" placeholder="%"/>
</div>
<div class="form-group">
    <label for="listCountries"> List Countries</label>
    <g:textField type="text" class="form-control" name="listCountries" placeholder=""/>
</div>
<!-- must be able to add additional locations-->


<div class="form-group">
    <label for="percentageOfLocationFilming">Percentage of Non-Studio Filming</label>
    <g:textField type="text" class="form-control" name="percentageOfLocationFilming" placeholder="%"/>
</div>
<div class="form-group">
    <label for="percentageOfStudioFilming">Percentage of Studio Filming</label>
    <g:textField type="text" class="form-control" name="percentageOfStudioFilming" placeholder="%"/>
</div>



                    </div>


                    <div class="col-xs-6">






<div class="form-group">
    <label for="anyPostProductionWorkDoneForOthers"> Any Post Production Work done for Others (If Yes, what percent:)</label>
    <p><input type="checkbox" name="anyPostProductionWorkDoneForOthersYes" id="anyPostProductionWorkDoneForOthersYesCheckBox"/> Yes </p>
    <div class="form-group">
        <g:textField type="text" class="form-control" name="anyPostProductionWorkDoneForOthersPercent" id="blanketFilmWorkOthersText" placeholder="%" style="display:none"/>
    </div>
    <p><input type="checkbox" name="anyPostProductionWorkDoneForOthersNo" /> No </p>



<div class="form-group">
    <label for="doYouDistributeAnyProducts">Do you distribute any products (If yes, please describe:)</label>
    <p><input type="checkbox" name="doYouDistributeAnyProductsYes" id="doYouDistributeAnyProductsYesCheckBox" /> Yes </p>
    <div class="form-group">
        <g:textField type="text" class="form-control" name="doYouDistributeAnyProductsYesDescribe" id="blanketFilmDistributeAnyProductText" placeholder="%" style="display:none"/>
    </div>
    <p><input type="checkbox" name="doYouDistributeAnyProductsNo" /> No </p>
</div>
<div class="form-group">
    <label for="doYouRentPropertyToOthers">Do you rent property to others? If Yes, please provide a copy of your rental contract and provide annual receipts:</label>
    <p><input type="checkbox" name="doYouRentPropertyToOthersYes" id="doYouRentPropertyToOthersCheckBox"/> Yes </p>
    <div class="form-group">
        <g:textField type="text" class="form-control" name="doYouRentPropertyToOthersDescribe" id="blanketFilmRentPropertyText" placeholder="%" style="display:none"/>
    </div>
    <p><input type="checkbox" name="doYouRentPropertyToOtherssNo" /> No </p>
    <button class="btn-default " type="button" >Attach</button>
</div>
<div class="form-group">
    <label for="doYouDoAnyEditingOrSpecialEffectsForOthers">Do you do any editing or special effects for others? If Yes, describe and provide receipts:</label>
    <p><input type="checkbox" name="doYouDoAnyEditingOrSpecialEffectsForOthersYes" id="doYouDoAnyEditingOrSpecialEffectsForOthersCheckBox"/> Yes </p>
    <div class="form-group">
        <g:textField type="text" class="form-control" name="doYouDoAnyEditingOrSpecialEffectsForOthersDescribe" id="blanketFilmEditingOthersText" placeholder="%" style="display:none"/>
    </div>
    <p><input type="checkbox" name="doYouDoAnyEditingOrSpecialEffectsForOthersNo" /> No </p>
    <button class="btn-default " type="button" >Attach</button>

</div>
<div class="form-group">
    <label for="hasAnyFormOfInsuranceEverBeenCancelledOrDeclined">Has any form of insurance ever been cancelled or declined? If Yes, Please expain: </label>
    <p><input type="checkbox" name="hasAnyFormOfInsuranceEverBeenCancelledOrDeclinedYes" id="hasAnyFormOfInsuranceEverBeenCancelledOrDeclinedCheckBox"/> Yes </p>
    <div class="form-group">
        <g:textField type="text" class="form-control" name="hasAnyFormOfInsuranceEverBeenCancelledOrDeclinedDescribe" id="blanketFilmInsuranceCancelledText" placeholder="%" style="display:none"/>
    </div>
    <p><input type="checkbox" name="hasAnyFormOfInsuranceEverBeenCancelledOrDeclinedNo" /> No </p>
</div>
<div class="form-group">
    <label for="previousLossExperienceForThePastThreeYears"> Previous Loss Experience for the past three years (Attach Company Loss Runs)</label>
    <g:textField type="text" class="form-control" name="previousLossExperienceForThePastThreeYears" placeholder=""/>
    <button class="btn-default " type="button" >Attach</button>
</div>

</div>




<!--table-->




    %{--<div class="col-xs-6">--}%

%{--<!-- Commercial General Liability-->--}%

%{--<h3>Commercial General Liability:</h3>--}%

%{--<div class="form-group">--}%
    %{--<label for="limitOfLiabilityCGL">Limit of Liability</label>--}%
    %{--<g:textField type="text" class="form-control" name="limitOfLiabilityCGL" placeholder="1,000,000 Occuence / 2,000,000 Aggregate"/>--}%
%{--</div>--}%
%{--<div class="form-group">--}%
    %{--<label for="grossProductionCost">Gross Production Cost</label>--}%
    %{--<g:textField type="text" class="form-control" name="grossProductionCost" placeholder=""/>--}%
    %{--<p><input type="checkbox" name="blanketAdditionalInsuredEndorsement" /> Blanket Additional Insured Endorsement </p>--}%
    %{--<p><input type="checkbox" name="blanketWaiverOfSubrogation" /> Blanket Waiver of Subrogation </p>--}%
%{--</div>--}%


    %{--<!--Non Owned and Hired Auto Liability-->--}%
                    %{--<br>--}%
                    %{--<br>--}%
%{--<h3>Non Owned and Hired Auto Liability:</h3>--}%


%{--<div class="form-group">--}%
    %{--<label for="limitOfLiabilityNOAHAL">Limit of Liability</label>--}%
    %{--<g:textField type="text" class="form-control" name="limitOfLiabilityNOAHAL" placeholder="1,000,000 Occuence / 2,000,000 Aggregate"/>--}%
%{--</div>--}%
    %{--<div class="form-group">--}%
        %{--<label for="costOfHire">Cost of Hire: (NON OWNED AND HIRED AUTO PHYSICAL DAMAGE IS INCLUDED UNDER THE PRODUCTION PACKAGE</label>--}%
        %{--<g:textField type="text" class="form-control" name="costOfHire" placeholder=""/>--}%
        %{--<p><input type="checkbox" name="motionPictureVehicles" /> Motion Picture Vehicles </p>--}%
        %{--<p><input type="checkbox" name="otherThanMotionPictureVehicles" /> Other than Motion Picture Vehicles </p>--}%
    %{--</div>--}%



    %{--<!--Workers Compensation-->--}%
                    %{--<br>--}%
                    %{--<br>--}%
                    %{--<h3>Workers Compensation:</h3>--}%

    %{--<div class="form-group">--}%
        %{--<label for="limitOfLiabilityWC">Limit of Liability </label>--}%
        %{--<g:textField type="text" class="form-control" name="limitOfLiabilityWC" placeholder=""/>--}%
    %{--</div>--}%
    %{--<div class="form-group">--}%
        %{--<label for="payroll">Payroll</label>--}%
        %{--<g:textField type="text" class="form-control" name="9610" placeholder="9610:"/>--}%
        %{--<g:textField type="text" class="form-control" name="8810" placeholder="8810:"/>--}%
    %{--</div>--}%
    %{--<div class="form-group">--}%
        %{--<label for="fein">FEIN:</label>--}%
        %{--<g:textField type="text" class="form-control" name="fein" placeholder=""/>--}%
    %{--</div>--}%
    %{--<div class="form-group">--}%
        %{--<label for="stateOfHire">State of Hire</label>--}%
        %{--<g:textField type="text" class="form-control" name="stateOfHire" placeholder=""/>--}%
    %{--</div>--}%



    %{--<!--Umbrella / Excess Liability-->--}%
                    %{--<br>--}%
                    %{--<br>--}%
%{--<h3>Umbrella / Excess Liability:</h3>--}%


    %{--<div class="form-group">--}%
        %{--<label for="limitOfLiabilityUEL">Limit of Liability</label>--}%
        %{--<g:textField type="text" class="form-control" name="limitOfLiabilityUEL" placeholder=""/>--}%
    %{--</div>--}%
    %{--<div class="form-group">--}%
    %{--<label for="underlyingGlNoalElCarrier">Underlying GL/NOAL/EL Carrier:</label>--}%
    %{--<g:textField type="text" class="form-control" name="underlyingGlNoalElCarrier" placeholder=""/>--}%
%{--</div>--}%
    %{--<div class="form-group">--}%
        %{--<label for="indicateIfUseOfAnyOfTheFollowingApply">Indicate if use of any of the following apply:</label>--}%
        %{--<g:textField type="text" class="form-control" name="indicateIfUseOfAnyOfTheFollowingApply" placeholder=""/>--}%
        %{--<p><input type="checkbox" name="useOfAnimals" />Use of animals</p>--}%
        %{--<p><input type="checkbox" name="motorcycles" />Motorcycles</p>--}%
        %{--<p><input type="checkbox" name="airborneCrafts" />Airborne Crafts</p>--}%
        %{--<p><input type="checkbox" name="railroadCarsOrEquipment" />Railroad Cars or Equipment</p>--}%
        %{--<p><input type="checkbox" name="pyrotechnics" />Pyrotechnics (Explosions, Fire) - Details to Follow</p>--}%
        %{--<p><input type="checkbox" name="stuntsOrHazardousActivities" />Stunts or Hazardous Activities - Details to Follow</p>--}%
        %{--<p><input type="checkbox" name="underwaterFilming" />Underwater Filming</p>--}%
        %{--<p><input type="checkbox" name="specialVehicles" />Special Vehicles</p>--}%
        %{--<p><input type="checkbox" name="waterborneCrafts" />Waterborne Crafts</p>--}%
        %{--</div>--}%
%{--</div>--}%
</div>
</div>
</div>