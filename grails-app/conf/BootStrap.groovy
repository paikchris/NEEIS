class BootStrap {

    def init = { servletContext ->
        new portal.Coverage(coverageName: "Accident Medical", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Aviation", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Bond", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Business Owners", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Auto Liability", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Commercial Automobile", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Business Auto Liability", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Commercial General Liability", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Professional Liability", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Commercial Inland Marine", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Cargo - Ocean or Motor", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Contingency/Even Cancellation", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Commercial Package", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Crime", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Cyber Security Privacy", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Umbrella - Commercial", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Umbrella - Excess", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Death, Disgrace, Disablement", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Directors & Officers", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Computers", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Equipment Floater", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Errors & Omissions - Film Producers", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Entertainment Package", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Employment Practices Liability", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Foreign Policy", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Guild Travel Accident", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Homeowners", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Hull & Machinery/Charterer's Legal Liability", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "NOA Liability", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "NOA Physical Damage", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Non Owned and Hired Auto", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Ocean Cargo", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Owners' & Contractors' Protective Liability", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Personal Auto Policy", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Dwelling Fire", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Errors & Omissions - Professional", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Commercial Property", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Umbrella - Personal", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Railroad Protective Liability", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Scheduled Auto", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Technology Package Policy", bindingAuthority: "N").save();
        new portal.Coverage(coverageName: "Third Party Property Damage", bindingAuthority: "Y").save();
        new portal.Coverage(coverageName: "Weather", bindingAuthority: "N").save();

























    }
    def destroy = {
    }
}
