class ClinicalRecord {
    constructor(id, patient, bloodPressure, respiratoryRate, bloodOxygenLevel, heartbeatRate, chiefComplaint, pastMedicalHistory, medicalDiagnosis, medicalPrescription, creationDateTime, status, version) {
        this.id = id;
        this.patient = patient; // Patient instance
        this.bloodPressure = bloodPressure;
        this.respiratoryRate = respiratoryRate;
        this.bloodOxygenLevel = bloodOxygenLevel;
        this.heartbeatRate = heartbeatRate;
        this.chiefComplaint = chiefComplaint;
        this.pastMedicalHistory = pastMedicalHistory;
        this.medicalDiagnosis = medicalDiagnosis;
        this.medicalPrescription = medicalPrescription;
        this.creationDateTime = creationDateTime;
        this.status = status;
        this.version = version;
    }
}


export default ClinicalRecord;
