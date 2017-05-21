package net.hr.in2.hgss.hgss.startScreen;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.squareup.picasso.Picasso;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.extra.MyApplication;
import net.hr.in2.hgss.hgss.extra.Utils;
import net.hr.in2.hgss.hgss.mainScreen.MainActivity;
import net.hr.in2.hgss.hgss.model.Person;

import butterknife.BindView;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    @BindView(R.id.btn_confirm)
    Button btnConfirm;

    @BindView(R.id.login_username)
    EditText username;

    @BindView(R.id.login_password)
    EditText password;

    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_start);
        ButterKnife.bind(this);

        ImageView imageView = (ImageView) findViewById(R.id.login_image);
        Picasso.with(this).load(R.drawable.hgss_logo).into(imageView);

        progressDialog = new ProgressDialog(this);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage(getResources().getString(R.string.loading_pg));

        final Activity activity = this;

        btnConfirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                progressDialog.show();

                Call<Person> call = Utils.getRestApi().login(getUsername(), getPassword());
                call.enqueue(new Callback<Person>() {
                    @Override
                    public void onResponse(Call<Person> call, Response<Person> response) {
                        progressDialog.hide();
                        if (response.body() != null) {

                            SharedPreferences sharedPref = getSharedPreferences("data", Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = sharedPref.edit();
                            Person person = response.body();
                            MyApplication.setPerson(person);
                            Gson gson = new Gson();
                            String personStr = gson.toJson(person);
                            editor.putString("USER", personStr);
                            editor.apply();

                            Intent i = new Intent(activity, MainActivity.class);
                            activity.startActivity(i);
                            activity.finish();
                        } else {
                            Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Person> call, Throwable t) {
                        progressDialog.hide();
                        Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                    }
                });
            }
        });
    }

    public String getUsername() {
        return username.getText().toString();
    }
    public String getPassword() {
        return password.getText().toString();
    }
}
