import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
    credential: cert({
        projectId: "archives-marketplace",
        clientEmail:
            "firebase-adminsdk-55nh6@archives-marketplace.iam.gserviceaccount.com",
        privateKey:
            "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLHmf9sE2l92mW\ngRf+jDjBw4bpnrrdhwa3KNJfkaezkzp+r9K4yGHxHxmhX5EUYLJ5Ctqt3H3tvGNo\nZYjJdJXrDkLkz+hmFSE6YzE4Rj3BZ/WvD6LaZlAO0SQ68tOaSsstIr0oTh/INzZS\n2BttXJIQIE6tK0WrTr4qrLQTpvf6t35D/e+nRlZG6aHgH0REnnKX7vv85SNKTamY\nfvvblBiBdlkdRdNT5Ru1OVKKwghTrUVTvMA0/m6lQ3zZm8QYs4eyZOohiW89WNYp\nhKy5EvSqwfFUHAKqqG1sAbdX/FjW0V65+KpsM5rqerDtZqGphvS84znqNdwJtblt\nJnF07y+/AgMBAAECggEACNcAG/JK93khgCBof5KLZ2He6Gi0o6+ZG/mqZyDgkMbn\nLaD1zoC1GywzEGT72VlM8zy0U93chpxfjgT9ocdttfJBtTuyHw0dVRIee4lDEqS3\ndiM+jDV6GtGWmsROm9GVgs21SqKu3vsF0afNE7A70RiBx1EmQSdkwAjEpzGx34AX\nYwmOPqVNF0hhvpsRXQ+UuLz2CHFUgiSWJDbWpSYR4SgwPo27HvBPwhp3EeXB6wdE\nKDXRHrl4jUQvsjM2NOIkaq9LtRR7JpalOYyeFJs5Eh8o6VoBSmYb7ifvAzoFQ4p7\nErDaqF1tG8h0WjSu1A/E3Zxn9V2Rt/cNocoHcAFdoQKBgQC91jd2v9fm4Y8YdPaA\niSctgYg6clWrCN4crWH3d8rAgyJ4p6xtwIzR5gvw5GavEaEhR0scSb7US9lzHFp8\nS06XolL2JyZSSFICY/8ZX/Uap2y2isuRqjpMrnEuyUyDKkE5N9MugPXnpB4RfJRd\nFs4O046q2MIAE93uUTUNmdC3DwKBgQC7mvumm66MdTnZ6O1M2nPR959JG8gcdzhU\nNdOVl9o0220t+VcluVR5nGK7CCcbU0924whAujeNo+V149ibAym4LDO9aBuAcGCc\nozVQD5MVK9SVBRfN8lk004ow8ks7e3CyAgSIZ73340/4o/dF+3Vc11J0R4SDfHxn\n266YKyZ8UQKBgD1kK2ehvuaRhz83hAgpUpwqya1tEDtRkNLhV086VD1RqzItt1t+\n64ttw+rRUkvHfb5PWgD58FajeNz7DGAp0m7DNeUY4BG4BZ10TSkdmRxXjJaz6AVh\ncZ0exMeGndHFNnaUkRz2449XycmJ6kj4eQbeb8LcelCgHCNX67pMRe0NAoGAck8Q\nnoelZzfWNAxU6ssAXyM+DtG6sH2D+OuDLFcGQcahU63lh7rQ2fiLv+JL0b6FYK8c\nzDOqvcbrfVWDGZBnzyw/qlzQxQW0GDzpswqKWBAIy3P6+SV9bU6nmQNJC8k+9Xd9\nQ4/SlEQQ6jMd66o37IXWW7tn5qXnN3EHhPhlzsECgYEAs3CAyUBJ/cuKVHSUpyMZ\ngBhEMvspWgl57KEN7sPcrIJ2fOrUESO8VeylJn6eLyP5Mr8CytOdv9uNO6KG5OlS\n2tgsin/E1282N6GnIoKeNf2IYIiotkks6VGg/z54NO3KiGSML5XMD6+n3mhlsalJ\nRTA7Qph12a2fc3b/KloNozA=\n-----END PRIVATE KEY-----\n",
    }),
};

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
