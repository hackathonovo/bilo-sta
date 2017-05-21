package net.hr.in2.hgss.hgss.extra;

import net.hr.in2.hgss.hgss.model.Person;
import net.hr.in2.hgss.hgss.model.Profession;

public class Utils {

    private static String ADDRES = "http://192.168.201.194:3000";
    private static RestApi RestApi;

    public static String getADDRES() {
        return ADDRES;
    }

    public static RestApi getRestApi() {
        return RestApi;
    }

    public static void setRestApi(RestApi RestApi) {
        Utils.RestApi = RestApi;
    }

    public static Person getPerson(){
        return MyApplication.getPerson();
    }

    public static void setPerson(Person person) {
        MyApplication.setPerson(person);
    }

    public static Profession mapStringToEnumProfession(String string){

        Profession profession;

        switch (string){
            case "Speleolog":
                profession = Profession.SPEOLOG;
                break;
            case "Alpinist":
                profession = Profession.ALPINIST;
                break;
            case "Helikoptersko spašavanje":
                profession = Profession.HELIKOPTERSKO_SPASAVANJE;
                break;
            case "Spašavanje na vodi":
                profession = Profession.SPASAVANJE_NA_VODI;
                break;
            default:
                profession = Profession.SVE;
                break;
        }

        return profession;
    }

//    public static void sendData(String key, String value){
//        MyApplication.getSocket().emit(key, value);
//    }

}
