package net.hr.in2.hgss.hgss.mainScreen.listAction;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.extra.Utils;
import net.hr.in2.hgss.hgss.model.Action;

import java.text.SimpleDateFormat;
import java.util.Locale;

import butterknife.BindView;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ActionActivity extends AppCompatActivity {

    @BindView(R.id.action_title_text)
    TextView actionTitleText;

    @BindView(R.id.action_start_text)
    TextView actionStartText;

    @BindView(R.id.action_details_text)
    TextView actionDetailsText;

    @BindView(R.id.action_target_people_number_text)
    TextView actionTargetPeopleNumber;

    @BindView(R.id.action_current_people_number_text)
    TextView actionCurrentPeopleNumber;

    @BindView(R.id.action_leader_name_text)
    TextView actionLeaderName;

    @BindView(R.id.action_leader_phone_number_text)
    TextView actionLeaderPhoneNumber;

    @BindView(R.id.add_me_btn)
    Button addMeBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_action);
        ButterKnife.bind(this);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        Intent i = getIntent();
        String actionJson = i.getExtras().getString("action","");
        Gson gson = new Gson();
        final Action action = gson.fromJson(actionJson, Action.class);

        actionTitleText.setText(action.getTitle());

        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy", Locale.UK);
        String date = format.format(action.getDatumStart());

        actionStartText.setText(date);
        actionDetailsText.setText(action.getDetails());
        actionTargetPeopleNumber.setText(String.valueOf(action.getPersonNumber()));
        actionCurrentPeopleNumber.setText(String.valueOf(action.getPersons().size()));
        actionLeaderName.setText(action.getLeader().getFirstname() + " " + action.getLeader().getFirstname());
        actionLeaderPhoneNumber.setText(action.getLeader().getPhoneNumber());

        final Activity activity = this;

        addMeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Call<Boolean> call = Utils.getRestApi().addRescuier(Utils.getPerson().getUsername(), action.getTitle());
                call.enqueue(new Callback<Boolean>() {
                    @Override
                    public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                        if (response.body() != null) {
                            Intent i = new Intent(activity, InActionActivity.class);
                            activity.startActivity(i);
                        } else {
                            Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                        }
                    }
                    @Override
                    public void onFailure(Call<Boolean> call, Throwable t) {
                        Toast.makeText(activity, getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                    }
                });
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                //Write your logic here
                this.finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
