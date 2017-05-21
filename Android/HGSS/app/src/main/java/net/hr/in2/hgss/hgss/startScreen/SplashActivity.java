package net.hr.in2.hgss.hgss.startScreen;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;

import com.google.gson.Gson;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.extra.MyApplication;
import net.hr.in2.hgss.hgss.mainScreen.MainActivity;
import net.hr.in2.hgss.hgss.model.Person;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_splash);

        SharedPreferences sharedPref = getSharedPreferences("data", Context.MODE_PRIVATE);
        String personStr = sharedPref.getString("USER", "");

        Intent intent;

        if(personStr.isEmpty()){
            intent = new Intent(this, LoginActivity.class);
        }else{
            Gson gson = new Gson();
            Person person = gson.fromJson(personStr, Person.class);
            MyApplication.setPerson(person);
            intent = new Intent(this, MainActivity.class);
        }
        startActivity(intent);
        finish();
    }
}
