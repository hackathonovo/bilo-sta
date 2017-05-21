package net.hr.in2.hgss.hgss.extra;

import android.app.Application;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.hr.in2.hgss.hgss.model.Person;

import io.socket.client.Socket;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MyApplication extends Application {

    private static Person person;
    private static Socket mSocket;

    @Override
    public void onCreate() {
        super.onCreate();
//        try {
//            mSocket = IO.socket("http://chat.socket.io");
//        } catch (URISyntaxException e) {}
//        mSocket.connect();

        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Utils.getADDRES())
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Utils.setRestApi(retrofit.create(RestApi.class));

    }

    public static  Person getPerson() {
        return person;
    }

    public static void setPerson(Person person) {
        MyApplication.person = person;
    }

    public static Socket getSocket() {
        return MyApplication.mSocket;
    }

    public void setSocket(Socket socket) {
        MyApplication.mSocket = socket;
    }
}
