package net.hr.in2.hgss.hgss.extra;

import net.hr.in2.hgss.hgss.model.Action;
import net.hr.in2.hgss.hgss.model.Person;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface RestApi {

    @FormUrlEncoded
    @POST("api/login")
    Call<Person> login(@Field("username") String username, @Field("password") String password);

    @POST("api/actions")
    Call<List<Person>> newAction(@Body Action action);

    @FormUrlEncoded
    @POST("api/availability")
    Call<Boolean> setAvailability(@Field("username") String username, @Field("availability") boolean availability);

    @GET("api/availability/{username}")
    Call<Boolean> getAvailability(@Path("username") String username);

    @GET("api/actions")
    Call<List<Action>> getActions();

    @FormUrlEncoded
    @POST("api/help")
    Call<Boolean> addRescuier(@Field("username") String username, @Field("title") String title);

    @FormUrlEncoded
    @POST("api/location")
    Call<Boolean> sendLoaction(@Field("username") String username, @Field("lng") double lng, @Field("lat") double lat);
}
